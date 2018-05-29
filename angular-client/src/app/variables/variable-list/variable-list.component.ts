import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';

@Component({
  selector: 'app-variable-list',
  templateUrl: './variable-list.component.html',
  styleUrls: ['./variable-list.component.css']
})
export class VariableListComponent implements OnInit {
  variables: any[] = [];
  variable: any = {};
  variableToEdit: any = {};
  variableToDelete: any = {};
  fetchingData: boolean = false;
  apiMessage: string;
  valuesList: any[] = [];
  editMode = false;

  constructor(private variableService: VariableService) { }

  ngOnInit(): void {
    this.variableService.showAddVariableBox = true;
    this.variableService.getVariables()
      .then(td => this.variables = td.variables)
  }

  addVariable(variable: any, variableForm: any): void {
    if (!variable) {
      return;
    }

    if(this.editMode) {
      variable.id = this.variable._id;
      this.variableService.updateVariable(variable)
        .then(td => {
          const updatedVariables = this.variables.map(t => {
            if (td.variable._id !== t._id) {
              return t;
            }
            return {...t, ...td.variable};
          });
          this.apiMessage = td.message;
          this.variables = updatedVariables;
        })
    } else {
      this.resolveVariableValues();
      this.variableService.createVariable(variable)
        .then(td => {
          console.log(td);
          this.variables.push(td.variable);
          variableForm.reset();
          this.valuesList = [];
        });

    }
  }

  addMoreValues(): void {
    this.valuesList.push({value:""});
  }

  resolveVariableValues(): void {
    this.variable.valueList = this.valuesList.map((item) => item.value);
  };

  resetValues(type): void {
    if (type === "NUMERIC" || type === "MULTIVALUE") {
      this.valuesList = [ {value:""} ];
    } else if (type === "UNIVALUE") {
      this.valuesList = [
        {value:"YES"},
        {value:"NO"}
      ];
    }
  }

  removeValue(index): void {
    this.valuesList.splice(index, 1);
  }

  toggleCreateMode(variableForm): void {
    variableForm.reset();
    this.variable = {};
    this.valuesList = [];
    this.editMode = false;
  }

  toggleEditMode(variable: any): void {
    this.editMode = true;
    this.variable = {...variable};
    this.valuesList = variable.valueList.map(item => {return {value: item} });
    this.apiMessage = "";
  }

  showDeleteVariable(variable: any): void {
    this.variableToDelete = variable;
    this.apiMessage = "";
  }

  deleteVariable(variable: any): void {
    if (!variable) {
      return;
    }
    this.variableService.deleteVariable(variable)
      .then(td => {
        const filteredVariables = this.variables.filter(t => t._id !== td.variable._id);
        this.apiMessage = td.message;
        this.variables = filteredVariables;
      })
  }

}

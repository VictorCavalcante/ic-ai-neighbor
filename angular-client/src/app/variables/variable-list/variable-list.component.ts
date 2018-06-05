import {Component, OnInit} from '@angular/core';
import {VariableService} from '../variable.service';

@Component({
  selector: 'app-variable-list',
  templateUrl: './variable-list.component.html',
  styleUrls: ['./variable-list.component.scss']
})
export class VariableListComponent implements OnInit {

  constructor(private variableService: VariableService) {
  }

  ngOnInit(): void {
  }

  submitPredictionForm(): void {
    const mockObj = {
      'buying': 0,
      'maint': 5,
      'doors': 0,
      'persons': 1,
      'lug_boot': 0,
      'safety': 0
    };
    this.variableService.predictWithClassifier(mockObj)
      .then(response => {
        console.log(response);
      })
  }

}

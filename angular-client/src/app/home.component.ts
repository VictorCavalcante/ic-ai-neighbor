import { Component, OnInit } from '@angular/core';

import { VariableService } from './variables/variable.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls:[ './home.component.scss' ]
})
export class HomePageComponent implements OnInit {
  tableOfItems:any[] = [];

  constructor(private variableService: VariableService) { }

  ngOnInit(): void {

    this.variableService.getCSVFile()
      .subscribe(
        data => {
          let response = data._body;
          let rows = response.split("\n");
          this.tableOfItems = rows.map(row => row.split(","));
        },
        error => { console.log(error); }
      );
  }

}

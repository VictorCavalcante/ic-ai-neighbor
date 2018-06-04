// ./angular-client/src/app/home.component.ts
import { Component, OnInit } from '@angular/core';

import { VariableService } from './variables/variable.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls:[ './home.component.css' ]
})
export class HomePageComponent implements OnInit {
  variables:any[] = [];
  constructor(private variableService: VariableService) { }

  ngOnInit(): void {
     this.variableService.getVariables()
       .then(variables => this.variables = variables.variables.reverse().slice(0,3))
  }

  executeTest(): void {
    let params: any = [];

    this.variableService.trainAndTestCase()
      .then(res => console.log(res));
  }


}

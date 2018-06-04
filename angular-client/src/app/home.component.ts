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

  ngOnInit(): void { }

  executeTest(): void {
    let params: any = [];

    this.variableService.testClassifierAccuracy()
      .then(res => console.log(res));
  }

}

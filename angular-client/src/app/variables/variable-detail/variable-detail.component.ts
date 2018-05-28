// ./angular-client/src/app/variable/variable-detail/variable-detail.component.ts
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { VariableService } from '../variable.service';

@Component({
  selector: 'app-variable-detail',
  templateUrl: './variable-detail.component.html',
  styleUrls: ['./variable-detail.component.css']
})
export class VariableDetailComponent implements OnInit {
  variable:any[]=[];

  constructor(
    private variableService:VariableService,
    private route:ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit():void {
    this.route.paramMap
        .switchMap((params:ParamMap) => this.variableService.getVariable(params.get('id')))
        .subscribe(td => this.variable =  td.variable[0])
  }

  goBack():void {
    this.location.back();
  }



}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VariableListComponent } from '../variable-list/variable-list.component';

const variableRoutes: Routes = [
  { path:'variables', component:VariableListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(variableRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class VariableRoutingModule { }

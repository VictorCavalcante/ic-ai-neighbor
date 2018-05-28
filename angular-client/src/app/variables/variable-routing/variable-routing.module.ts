import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VariableListComponent } from '../variable-list/variable-list.component';
import { VariableDetailComponent } from '../variable-detail/variable-detail.component'

const variableRoutes: Routes = [
  { path:'variables', component:VariableListComponent },
  { path:'variable/:id', component:VariableDetailComponent }
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

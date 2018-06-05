import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExecuteComponent } from './execute.component';

const executeRoutes: Routes = [
  { path:'execute', component:ExecuteComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(executeRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class ExecuteRoutingModule { }

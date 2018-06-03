// ./angular-client/src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home.component';

import { AppRoutingModule } from './app-routing.module';
import { VariableService} from "./variables/variable.service";
import {VariableRoutingModule} from "./variables/variable-routing/variable-routing.module";
import {VariableDetailComponent} from "./variables/variable-detail/variable-detail.component";
import {VariableListComponent} from "./variables/variable-list/variable-list.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    VariableDetailComponent,
    VariableListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    VariableRoutingModule,
    FormsModule
  ],
  providers: [
    VariableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

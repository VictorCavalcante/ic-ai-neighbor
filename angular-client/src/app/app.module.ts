import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home.component';

import { AppRoutingModule } from './app-routing.module';
import { VariableService} from "./variables/variable.service";
import { VariableRoutingModule } from "./variables/variable-routing/variable-routing.module";
import { VariableListComponent } from "./variables/variable-list/variable-list.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
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

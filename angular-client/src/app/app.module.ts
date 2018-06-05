import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home.component';

import { AppRoutingModule } from './app-routing.module';
import { ExecuteService} from "./execute/execute.service";
import { ExecuteRoutingModule } from "./execute/execute-routing.module";
import { ExecuteComponent } from "./execute/execute.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ExecuteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ExecuteRoutingModule,
    FormsModule
  ],
  providers: [
    ExecuteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

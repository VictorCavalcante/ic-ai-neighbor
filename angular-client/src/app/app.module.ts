// ./angular-client/src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home.component';

import { AppRoutingModule } from './app-routing.module';
import { TodoRoutingModule } from './todo/todo-routing/todo-routing.module';
import { TodoService } from './todo/todo.service';
import { VariableService} from "./variables/variable.service";
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import {VariableRoutingModule} from "./variables/variable-routing/variable-routing.module";
import {VariableDetailComponent} from "./variables/variable-detail/variable-detail.component";
import {VariableListComponent} from "./variables/variable-list/variable-list.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TodoListComponent,
    TodoDetailComponent,
    VariableDetailComponent,
    VariableListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    TodoRoutingModule,
    VariableRoutingModule,
    FormsModule
  ],
  providers: [
    TodoService,
    VariableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

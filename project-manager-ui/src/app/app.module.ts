import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { ViewTaskComponent } from './components/task/view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

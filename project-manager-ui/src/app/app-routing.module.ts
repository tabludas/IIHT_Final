import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { ViewTaskComponent } from './components/task/view-task/view-task.component';


const routes: Routes = [
  { path: 'addProject', component: AddProjectComponent },
  { path: 'addTask', component: AddTaskComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'viewTask', component: ViewTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]  
})

export class AppRoutingModule { }

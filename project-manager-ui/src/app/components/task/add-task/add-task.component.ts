import { Component, OnInit } from '@angular/core';
import { PmTask } from 'src/app/model/pm-task';
import { Project } from 'src/app/model/project';
import { PmParentTask } from 'src/app/model/pm-parent-task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  
  task:PmTask;
  project:Project;
  parentTask:PmParentTask;
  
  constructor() { 
    this.task=new PmTask();
    this.task.project=new Project();
    this.task.parentTask=new PmParentTask();
  }

  ngOnInit() {
  }
  selectProject():void{
    alert("ok");
  }

  onChecboxSelect(event:any):void{
    alert("ok");
  }

  onDrag(event:any):void{
    alert("ok");
  }

  selectParentTask():void{
    alert("ok");
  }

  selectUser():void{
    alert("ok");
  }


}

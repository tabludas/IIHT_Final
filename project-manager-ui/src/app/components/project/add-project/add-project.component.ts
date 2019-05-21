import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { formatDate } from '@angular/common';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  project: Project;
  currentDate: Date;
  nextDate: Date;
  disabled:boolean;
  constructor() {
    this.project = new Project();
    this.project.user=new User();    
    this.project.priority = 0;
  }

  ngOnInit() {
  }

  onChecboxSelect(event: any) {
    //let startDate:any=document.getElementById("startDate");
    //let endDate:any=document.getElementById("endDate");
    
    if (event.target.checked) {
      this.currentDate = new Date();
      this.nextDate = new Date();
      this.nextDate.setDate(this.currentDate.getDate() + 1);
      this.project.startDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en');
      this.project.endDate = formatDate(this.nextDate, 'yyyy-MM-dd', 'en');
      this.disabled=false;
      
    } else if(!event.target.checked){ 
      this.project.startDate="";
      this.project.endDate="";
      this.disabled=true;
    }
  }

  onDrag(event: any): void {
    this.project.priority = event.target.value;
    console.log(JSON.stringify(this.project));
    console.log(this.project.startDate);
    console.log(this.project.endDate);
  }


}

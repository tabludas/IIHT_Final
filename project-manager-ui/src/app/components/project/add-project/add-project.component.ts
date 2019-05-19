import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  project: Project;
  currentDate: Date;
  nextDate: Date;
  constructor() {
    this.project = new Project();
    this.project.priority = 0;

  }

  ngOnInit() {
  }

  onChecboxSelect(event: any) {
    let startDate=document.getElementById("startDate");
    let endDate=document.getElementById("endDate");
    
    if (event.target.checked) {
      this.currentDate = new Date();
      this.nextDate = new Date();
      this.nextDate.setDate(this.currentDate.getDate() + 1);
      this.project.startDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en');
      this.project.endDate = formatDate(this.nextDate, 'yyyy-MM-dd', 'en');
      console.log(this.project.startDate);
      console.log(this.project.endDate);
      
      startDate.disabled=false;      
      endDate.disabled=false;
      console.log(startDate);

     
    } else if(!event.target.checked){      
      startDate.disabled=true;     
      endDate.disabled=true;      
      this.project.startDate="";
      this.project.endDate="";
    }
  }

  onDrag(event: any): void {
    this.project.priority = event.target.value;
    console.log(JSON.stringify(this.project));
    console.log(this.project.startDate);
    console.log(this.project.endDate);
  }


}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PmTask } from 'src/app/model/pm-task';
import { ProjectService } from 'src/app/services/project.service';
import { PmParentTask } from 'src/app/model/pm-parent-task';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  modalRef: BsModalRef;
  parentTaskModalRef: BsModalRef;
  projectModalRef: BsModalRef;

  index: number;
  taskList: PmTask[];
  filteredTasks: PmTask[];

  parentTasks: PmParentTask[];
  filteredParentTasks: PmParentTask[];
  projects: Project[];
  projectId: string;
  filteredProjects: Project[];
  private _parentTaskSearchValue: string = "";
  private _projectSearchValue: string = "";

  errorMsg: String;

  constructor(private projectService: ProjectService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getTasks();
  }


  getTasks(): any {
    let obs = this.projectService.getTasks();
    obs.subscribe((response: any) => {
      this.taskList = response ? response.data : null;
      this.filteredTasks = response ? response.data : null;
    },
      error => this.errorMsg = <any>error
    );
  }

  getParentTasks(): any {
    let obs = this.projectService.getParentTasks();
    obs.subscribe((response: any) => {
      this.parentTasks = response ? response.data : null;
      this.filteredParentTasks = response ? response.data : null;
    },
      error => this.errorMsg = <any>error
    );
  }

  getProjects(): any {
    let obs = this.projectService.getProjects();
    obs.subscribe((response: any) => {
      this.projects = response ? response.data : null;
      this.filteredProjects = response ? response.data : null;
    },
      error => this.errorMsg = <any>error
    );
  }

  saveTask(i): void {
    this.projectService.saveOrUpdateTask(this.filteredTasks[i]).subscribe((response: any) => {
      this.closeModal();
    },
      error => this.errorMsg = <any>error
    );
  }

  endTask(i: number): void {
    this.filteredTasks[i].taskCompleted = "Y";
    let obs = this.projectService.saveOrUpdateTask(this.filteredTasks[i]);
    obs.subscribe(res => this.filteredTasks[i].taskCompleted = 'Y');
  }

  closeModal() {
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>, i) {
    this.index = i;
    this.modalRef = this.modalService.show(template);
  }

  set parentTaskSearchValue(value: string) {
    this._parentTaskSearchValue = value;
    this.filteredParentTasks = this.parentTaskSearchValue ? this.performParentTaskFilter(this.parentTaskSearchValue) : this.parentTasks;
  }

  get parentTaskSearchValue(): string {
    return this._parentTaskSearchValue;
  }

  performParentTaskFilter(filterValue: string): PmParentTask[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.parentTasks.filter((parentTask: PmParentTask) => parentTask.parentTaskName.toLocaleLowerCase().indexOf(filterValue) !== -1);
  }

  openParentTaskModal(template: TemplateRef<any>): void {
    this.getParentTasks();
    this.parentTaskModalRef = this.modalService.show(template);
  }

  closeParentTaskModal(): void {
    this.parentTaskModalRef.hide();
  }

  selectParentTask(i: number): void {
    this.filteredTasks[i].parentTask = this.filteredParentTasks[i];
    this.closeParentTaskModal();
  }

  set projectSearchValue(value: string) {
    this._projectSearchValue = value;
    this.filteredProjects = this.projectSearchValue ? this.performProjectFilter(this.projectSearchValue) : this.projects;
  }

  get projectSearchValue(): string {
    return this._projectSearchValue;
  }

  performProjectFilter(filterValue: string): Project[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.projects.filter((project: Project) => project.projectName.toLocaleLowerCase().indexOf(filterValue) !== -1);
  }

  openProjectModal(template: TemplateRef<any>): void {
    this.getProjects();
    this.projectModalRef = this.modalService.show(template);
  }

  closeProjectModal(): void {
    this.projectModalRef.hide();
  }

  selectProjectAndRelatedTasks(i: number): void {
    this.projectId = this.filteredProjects[i].projectId;
    this.filteredTasks = this.taskList;
    this.setRelatedTasks(this.projectId);
    this.closeProjectModal();
  }


  validateDate(i): boolean {
    let startDateStr = this.filteredTasks[i].startDate;
    let endDateStr = this.filteredTasks[i].endDate;
    let startDate: Date = new Date(startDateStr);
    let endDate: Date = new Date(endDateStr);
    let flag: boolean = false;
    if (endDate.getTime() >= startDate.getTime()) {
      flag = true;
    }
    return flag;
  }

  setRelatedTasks(projectId: string): void {
    this.filteredTasks = this.filteredTasks.filter(task => task.project.projectId === projectId);        
  }

  sortByStartDate(): void {
    this.filteredTasks.sort((a: PmTask, b: PmTask) => {
      let date1: Date = new Date(a.startDate);
      let date2: Date = new Date(b.startDate);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    });
  }

  sortByEndDate(): void {
    this.filteredTasks.sort((a: PmTask, b: PmTask) => {
      let date1: Date = new Date(a.endDate);
      let date2: Date = new Date(b.endDate);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    });
  }

  sortByPriority(): void {
    this.filteredTasks.sort((a: PmTask, b: PmTask) => {
      let value1: number = a.priority;
      let value2: number = b.priority;
      return value2 - value1;
    });
  }

  sortByCompletion(): void {
    this.filteredTasks.sort((a: PmTask, b: PmTask) => {
      let value1: string = a.taskCompleted.toLocaleLowerCase();
      let value2: string = b.taskCompleted.toLocaleLowerCase();
      if (value1 < value2) return -1;
      if (value1 > value2) return 1;
      return 0;
    });
  }

  reset():void{
    this.projectId="";
    this.filteredTasks = this.taskList;    
  }

  onKey(event: any, i): void {
    this.filteredTasks[i].priority = event.target.value;
  }

}

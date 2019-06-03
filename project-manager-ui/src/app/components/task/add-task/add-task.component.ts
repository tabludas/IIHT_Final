import { Component, OnInit, TemplateRef } from '@angular/core';
import { PmTask } from 'src/app/model/pm-task';
import { Project } from 'src/app/model/project';
import { PmParentTask } from 'src/app/model/pm-parent-task';
import { User } from 'src/app/model/user';
import { ProjectService } from 'src/app/services/project.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task: PmTask;
  project: Project;
  parentTask: PmParentTask;
  user: User;

  projects: Project[];
  parentTasks: PmParentTask[];
  users: User[];
  filteredProjects: Project[];
  filteredParentTasks: PmParentTask[];
  filteredUsers: User[];

  projectModalRef: BsModalRef;
  parentTaskModalRef: BsModalRef;
  userModalRef: BsModalRef;

  index: number;
  errorMsg: String;

  private _projectSearchValue: string = "";
  private _parentTaskSearchValue: string = "";
  private _userSearchValue: string = "";

  set projectSearchValue(value: string) {
    this._projectSearchValue = value;
    this.filteredProjects = this.projectSearchValue ? this.performProjectFilter(this.projectSearchValue) : this.projects;
  }

  get projectSearchValue(): string {
    return this._projectSearchValue;
  }

  set parentTaskSearchValue(value: string) {
    this._parentTaskSearchValue = value;
    this.filteredParentTasks = this.parentTaskSearchValue ? this.performParentTaskFilter(this.parentTaskSearchValue) : this.parentTasks;
  }

  get parentTaskSearchValue(): string {
    return this._parentTaskSearchValue;
  }

  public set userSearchValue(value: string) {
    this._userSearchValue = value;
    this.filteredUsers = this.userSearchValue ? this.performUserFilter(this.userSearchValue) : this.users;
  }

  public get userSearchValue(): string {
    return this._userSearchValue;
  }

  constructor(private modalService: BsModalService, private projectService: ProjectService) {
    this.task = new PmTask();
    this.task.project = new Project();
    this.task.priority = 0;
    this.task.parentTask = new PmParentTask();
    this.task.user = new User();
  }

  ngOnInit() {

  }

  saveOrUpdateTask(): any {
    console.log("Task---> " + JSON.stringify(this.task));
    this.projectService.saveOrUpdateTask(this.task).subscribe((response: any) => {
      console.log("Response-> " + response);
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

  getParentTasks(): any {
    let obs = this.projectService.getParentTasks();
    obs.subscribe((response: any) => {
      this.parentTasks = response ? response.data : null;
      this.filteredParentTasks = response ? response.data : null;
    },
      error => this.errorMsg = <any>error
    );
  }

  getUsers(): any {
    let obs = this.projectService.getUsers();
    obs.subscribe((response: any) => {
      this.users = response ? response.data : null;
      this.filteredUsers = response ? response.data : null;
    },
      error => this.errorMsg = <any>error
    );
  }

  performProjectFilter(filterValue: string): Project[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.projects.filter((project: Project) => project.projectName.toLocaleLowerCase().indexOf(filterValue) !== -1);
  }

  performParentTaskFilter(filterValue: string): PmParentTask[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.parentTasks.filter((parentTask: PmParentTask) => parentTask.parentTaskName.toLocaleLowerCase().indexOf(filterValue) !== -1);
  }

  performUserFilter(filterValue: string): User[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.users.filter((user: User) => user.firstName.toLocaleLowerCase().indexOf(filterValue) !== -1);
  }

  openProjectModal(template: TemplateRef<any>): void {
    this.getProjects();
    this.projectModalRef = this.modalService.show(template);
  }

  closeProjectModal(): void {
    this.projectModalRef.hide();
  }

  selectProject(i: number): void {
    this.task.project = this.filteredProjects[i];
    //this.task.project = this.filteredProjects[i];
    this.closeProjectModal();
  }

  openParentTaskModal(template: TemplateRef<any>): void {
    this.getParentTasks();
    this.parentTaskModalRef = this.modalService.show(template);
  }

  closeParentTaskModal(): void {
    this.parentTaskModalRef.hide();
  }

  selectParentTask(i: number): void {
    this.task.parentTask = this.filteredParentTasks[i];
    this.closeParentTaskModal();
  }

  openUserModal(template: TemplateRef<any>): void {
    this.getUsers();
    this.userModalRef = this.modalService.show(template);
  }

  closeUserModal() {
    this.userModalRef.hide();
  }

  selectUser(i: number): void {
    let user = this.filteredUsers[i];
    this.task.user = user;
    this.task.user.fullName = user.firstName + " " + user.lastName
    this.closeUserModal();
  }


  onChecboxSelect(event: any): void {
    this.task.parentTask.parentTaskDisabled = false;
    if (!event.target.checked) {
      this.task.parentTask.parentTaskDisabled = true;
      this.task.parentTask.parentTaskName = "";
    }
  }

  onDrag(event: any): void {
    this.task.priority = event.target.value;
  }

  reset(): void {
    this.task.project.projectName = "";
    this.task.taskName = "";
    this.task.user.fullName = "";
    this.task.startDate = "";
    this.task.endDate = "";
    this.task.parentTask.parentTaskName = "";
  }

  validateDate(): boolean {
    let startDateStr = this.task.startDate;
    let endDateStr = this.task.endDate;
    let startDate: Date = new Date(startDateStr);
    let endDate: Date = new Date(endDateStr);
    let flag: boolean = true;
    if (endDate >= startDate) {
      flag = false;
    }
    return flag;
  }
}


}

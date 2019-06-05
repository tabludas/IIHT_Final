import { Component, OnInit, TemplateRef } from '@angular/core';
import { Project } from 'src/app/model/project';
import { formatDate } from '@angular/common';
import { User } from 'src/app/model/user';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProjectService } from 'src/app/services/project.service';
import { Result } from 'src/app/model/result';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  userModalRef: BsModalRef;
  projectModalRef: BsModalRef;
  project: Project;
  currentDate: Date;
  nextDate: Date;
  disabled: boolean;
  index: number;
  projects: Project[];
  filteredData: Project[];
  users: User[];
  userFilteredData: User[];
  user: User;
  errorMsg: String;  

  _searchValue: string = "";
  _userSearchValue: string = "";

  public set searchValue(value: string) {
    this._searchValue = value;
    this.filteredData = this.searchValue ? this.performProjectFilter(this.searchValue) : this.projects;
  }
  public get searchValue(): string {
    return this._searchValue;
  }

  public set userSearchValue(value: string) {
    this._userSearchValue = value;
    this.userFilteredData = this.userSearchValue ? this.performUserFilter(this.userSearchValue) : this.users;
  }
  public get userSearchValue(): string {
    return this._userSearchValue;
  }

  ngOnInit() {
    this.getProjects();
  }

  constructor(private modalService: BsModalService, private projectService: ProjectService) {
    this.project = new Project();
    this.project.priority = 0;
    this.project.noOfTask = 1;
    this.project.user = new User();      
  }

  getProjects(): any {
    let obs = this.projectService.getProjects();
    obs.subscribe((response: any) => {
      this.projects = response ? response.data : null;
      this.filteredData = response ? response.data : null;
    },
      error => this.errorMsg = <any>error
    );
  }

  getUsers(): any {
    let obs = this.projectService.getUsers();
    obs.subscribe((response: any) => {
      this.users = response ? response.data : null;
      this.userFilteredData = response ? response.data : null;
      
    },
      error => this.errorMsg = <any>error
    );
  }

  saveOrUpdateProject(): any {
    console.log("Project ---->"+JSON.stringify(this.project));
    this.projectService.saveOrUpdateProject(this.project).subscribe((response: any) => {      
      this.reset();
    },
      error => this.errorMsg = <any>error
    );
    
  }

  updateProject(i: number): void {    
    this.projectService.saveOrUpdateProject(this.filteredData[i]).subscribe((response: any) => {
      if (!this.filteredData.some(project => project.projectId === this.filteredData[i].projectId)) {
        this.filteredData.push(this.filteredData[i]);
      }
      this.closeProjectModal();

    },
      error => this.errorMsg = <any>error
    );
   
  }

  performProjectFilter(filterValue: string): Project[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.projects.filter((project: Project) => project.projectName.toLocaleLowerCase().indexOf(filterValue) !== -1);
  }

  performUserFilter(filterValue: string): User[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.users.filter((user: User) => user.firstName.toLocaleLowerCase().indexOf(filterValue) !== -1);
  }

  onChecboxSelect(event: any): void {

    if (event.target.checked) {
      this.currentDate = new Date();
      this.nextDate = new Date();
      this.nextDate.setDate(this.currentDate.getDate() + 1);
      this.project.startDate = formatDate(this.currentDate, 'yyyy-MM-dd', 'en');
      this.project.endDate = formatDate(this.nextDate, 'yyyy-MM-dd', 'en');
      this.disabled = false;

    } else if (!event.target.checked) {
      this.project.startDate = "";
      this.project.endDate = "";
      this.disabled = true;
    }
  }

  onDrag(event: any): void {
    this.project.priority = event.target.value;
  }

  onDragUpdate(event: any, i: number): void {
    this.filteredData[i].priority = event.target.value;
  }

  sortByStartDate(): void {
    this.filteredData.sort((a: Project, b: Project) => {
      let date1: Date = new Date(a.startDate);
      let date2: Date = new Date(b.startDate);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    });
  }

  sortByEndDate(): void {
    this.filteredData.sort((a: Project, b: Project) => {
      let date1: Date = new Date(a.endDate);
      let date2: Date = new Date(b.endDate);
      if (date1 > date2) return -1;
      if (date1 < date2) return 1;
      return 0;
    });
  }

  sortByPriority(): void {
    this.filteredData.sort((a: Project, b: Project) => {
      let value1: number = a.priority;
      let value2: number = b.priority;
      return value2 - value1;
    });
  }

  sortByCompletion(): void {
    this.filteredData.sort((a: Project, b: Project) => {
      let value1: string = a.projectCompleted.toLocaleLowerCase();
      let value2: string = b.projectCompleted.toLocaleLowerCase();
      if (value1 < value2) return -1;
      if (value1 > value2) return 1;
      return 0;
    });
  }

  openUserModal(template: TemplateRef<any>, i: number) {
    this.getUsers();
    if (this.filteredData[i]) {
      this.project = this.filteredData[i];
    }
    
    this.userModalRef = this.modalService.show(template);
  }

  openProjectModal(template: TemplateRef<any>, i) {
    this.index = i;
    this.project=this.filteredData[i];    
    this.projectModalRef = this.modalService.show(template);
  }

  closeUserModal() {
    this.userModalRef.hide();
  }

  closeProjectModal() {
    this.reset();
    this.getProjects();
    this.projectModalRef.hide();
  }

  selectUser(i: number): void {
    let user = this.userFilteredData[i];
    this.project.user = user;
    this.project.user.fullName = user.firstName + " " + user.lastName;
    this.userModalRef.hide();
  }

  reset(): void {   
    this.project.endDate = '';
    this.project.projectId = '';
    this.project.startDate = '';
    this.project.priority = 0;
    this.project.projectName = '';
    this.project.user = new User();
    this.getProjects();
  }

  validateData(project: Project): boolean {
    let startDateStr = this.project.startDate;
    let endDateStr = this.project.endDate;
    let startDate: Date = new Date(startDateStr);
    let endDate: Date = new Date(endDateStr);
    let flag: boolean = true;
    if (startDate && endDate && this.project.user.firstName && this.project.user.lastName && this.project.projectName && endDate.getTime() >= startDate.getTime()) {
      flag = false;
    }
    return flag;
  }

  suspend(i: number): void {
    this.project = this.filteredData[i];
    this.project.projectCompleted = "Y";
    this.updateProject(i);
  }

}

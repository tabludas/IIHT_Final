import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { User } from 'src/app/model/user';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User;
  users: User[];
  filteredUsers: User[];

  modalRef: BsModalRef;
  index: number;
  errorMsg: String;

  private _userSearchValue: string = "";

  constructor(private modalService: BsModalService, private projectService: ProjectService) {
    this.user = new User();

  }

  ngOnInit() {
    this.getUsers();
  }

  saveOrUpdateUser(): any {
    console.log("User---> " + JSON.stringify(this.user));
    this.projectService.saveOrUpdateUser(this.user).subscribe((response: any) => {
      console.log("Response-> " + response);
      if (!this.filteredUsers.some(user => user.userId === this.user.userId)) {
        this.filteredUsers.push(this.user);
      }
    },
      error => this.errorMsg = <any>error
    ); 
    this.getUsers();
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

  public set userSearchValue(value: string) {
    this._userSearchValue = value;
    this.filteredUsers = this.userSearchValue ? this.performUserFilter(this.userSearchValue) : this.users;
  }
  public get userSearchValue(): string {
    return this._userSearchValue;
  }

  updateUser(i: number): void {
    this.projectService.saveOrUpdateUser(this.filteredUsers[i]).subscribe((response: any) => {
      console.log("Response-> " + response);
      if (!this.filteredUsers.some(user => user.userId === this.user.userId)) {
        this.filteredUsers.push(this.user);
      }
    },
      error => this.errorMsg = <any>error
    );    
    this.closeUserModal();
  }

  deleteUser(i: number): void {
    this.projectService.deleteUser(this.filteredUsers[i]).subscribe((response: any) => {
      console.log("Response-> " + response);
      const result=this.filteredUsers.filter(item=>item.userId!=this.filteredUsers[i].userId);
      this.filteredUsers=result;
    },
      error => this.errorMsg = <any>error
    );    
  }

  performUserFilter(filterValue: string): User[] {
    filterValue = filterValue.toLocaleLowerCase();
    return this.users.filter((user: User) => user.firstName.toLocaleLowerCase().indexOf(filterValue) !== -1);
  }

  openUserMdal(template: TemplateRef<any>, i: number): void {
    this.index = i;
    this.modalRef = this.modalService.show(template);
  }

  closeUserModal() {
    this.getUsers();
    this.modalRef.hide();
  }

  sortByFirstName(): void {
    this.filteredUsers.sort((a: User, b: User) => {
    let value1: string = a.firstName.toLocaleLowerCase();
    let value2: string = b.firstName.toLocaleLowerCase();
    return value1.localeCompare(value2);
    });
  }

  sortByLastName(): void {
    this.filteredUsers.sort((a: User, b: User) => {
    let value1: string = a.lastName.toLocaleLowerCase();
    let value2: string = b.lastName.toLocaleLowerCase();
    return value1.localeCompare(value2);
    });
  }

  sortById(): void {
    this.filteredUsers.sort((a: User, b: User) => {
    let value1: string = a.empId.toLocaleLowerCase();
    let value2: string = b.empId.toLocaleLowerCase();
    return value1.localeCompare(value2);
    });
  }  

  selectUser(i: number): void {

    this.modalRef.hide();
  }

  reset(): void {
    this.user.firstName = "";
    this.user.lastName = "";
    this.user.empId = "";
  }
}

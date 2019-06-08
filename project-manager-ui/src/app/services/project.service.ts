import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Project } from '../model/project';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ProjectConstant } from '../constants/project-constant';
import { Result } from '../model/result';
import { User } from '../model/user';
import { PmParentTask } from '../model/pm-parent-task';
import { PmTask } from '../model/pm-task';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  url: string;


  constructor(private http: HttpClient) {

  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(ProjectConstant.FETCH_PROJECTS).pipe(tap((data: Result) => {

    },
      catchError(this.handleError)
    ));
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(ProjectConstant.FETCH_USERS).pipe(tap((data: Result) =>
      catchError(this.handleError)
    ));
  }

  getParentTasks(): Observable<PmParentTask[]> {
    return this.http.get<PmParentTask[]>(ProjectConstant.FETCH_PARENT_TASKS).pipe(tap((data: Result) =>
      catchError(this.handleError)
    ));
  }

  getTasks(): Observable<PmTask[]> {
    return this.http.get<PmTask[]>(ProjectConstant.FETCH_TASKS).pipe(tap((data: Result) => {

    },
      catchError(this.handleError)
    ));
  }

  saveOrUpdateProject(project: Project): Observable<any> {
    return this.http.post<Project>(ProjectConstant.SAVE_PROJECT, project, httpOptions).pipe(tap((data: Result) =>
      catchError(this.handleError)
    ));
  }

  saveOrUpdateTask(task: PmTask): Observable<any> {
    return this.http.post<PmTask>(ProjectConstant.SAVE_TASK, task, httpOptions).pipe(tap((data: Result) =>
      catchError(this.handleError)
    ));
  }

  saveOrUpdateUser(user: User): Observable<any> {
    return this.http.post<User>(ProjectConstant.SAVE_USER, user, httpOptions).pipe(tap((data: Result) =>
      catchError(this.handleError)
    ));
  }

  endTask(task: PmTask): Observable<any> {
    return this.http.post<PmTask>(ProjectConstant.SAVE_TASK, task, httpOptions).pipe(tap((data: Result) => { },
      catchError(this.handleError)
    ));
  }

  deleteUser(user: User): Observable<any> {
    return this.http.post<User>(ProjectConstant.DELETE_USER, user, httpOptions).pipe(tap((data: Result) =>
      catchError(this.handleError)
    ));
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errMsg = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errMsg = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errMsg);
  }

}

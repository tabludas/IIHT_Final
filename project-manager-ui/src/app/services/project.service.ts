import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Project } from '../model/project';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ProjectConstant } from '../constants/project-constant';
import { Result } from '../model/result';
import { User } from '../model/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url: string;


  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(ProjectConstant.FETCH_PROJECTS).pipe(tap((data: Result) => 
      console.log("Service layer-> "+data)),
      catchError(this.handleError)
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(ProjectConstant.FETCH_USERS).pipe(tap((data: Result) => 
      console.log("Service layer-> "+data)),
      catchError(this.handleError)
    );
  }

  saveOrUpdateProject(project: Project): Observable<any> {
    return this.http.post<Project>(ProjectConstant.SAVE_PROJECTS, project, httpOptions).pipe(tap((data: Result) =>
      console.log("Service layer-> "+data)),
      catchError(this.handleError)
    );
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
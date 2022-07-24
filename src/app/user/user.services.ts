import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from './user.model'
import {catchError, map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginUser } from '../login/login.model';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

const endpoint = "http://localhost:8084/bookmarks/";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

// create the get all users http get function here
getUsers(): Observable<User[]> {
    //TODO: get users
    return this.http.get<User[]>(endpoint + 'users/all').pipe(
      catchError(this.handleError<any>('getUsers'))
    );
  }
  // create the get user by id  http get function here
  getUserById(id:any): Observable<User> {
    //TODO: get user by ID
    return this.http.get<User>(endpoint + 'users/' + id).pipe(
      catchError(this.handleError<any>('getUserById'))
    );
  }
  addUser (user:any): Observable<any> {
    console.log(user);
    return this.http.post<User>(endpoint + 'users/add', JSON.stringify(user), httpOptions).pipe(
      tap((userItem) => console.log(`added user w/ id=${userItem.id}`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

  updateUser (id:any, user:any): Observable<any> {
    return this.http.put<User>(endpoint + 'users/update/' + id, JSON.stringify(user), httpOptions).pipe(
      tap(userItem => console.log(`updated user id=${userItem.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser (id:any): Observable<any> {
    return this.http.delete<any>(endpoint + 'users/delete/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<any>('deleteUser'))
    );
  }
  login(loginUser:LoginUser): Observable<any>{
    return this.http.post<any>(endpoint + 'users/login', JSON.stringify(loginUser), httpOptions).pipe(
        catchError(this.handleError<any>('login'))
      );
  }


private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}

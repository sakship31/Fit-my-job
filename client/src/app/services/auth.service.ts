import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  constructor(private http: HttpClient) { }

  // registerUser(user) {
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',});

  // console.log(options)    
  //   return this.http.post('http://localhost:3000/signup', user,options).pipe(data=>data)
  //   // return this.http.get('http://localhost:3000/users')
  // }
  registerUser(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    let url = 'http://localhost:3000/signup';
    return this.http.post(url, data, options)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // authenticateUser(user){
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',});
  // let options = { headers: headers };
  // console.log(options)

  //   return this.http.post('http://localhost:3000/login', user,options).pipe(res=>res)
  // }

  authenticateUser(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': localStorage.getItem('id_token'),   
    });
    let options = { headers: headers };
    let url = 'http://localhost:3000/login';
    return this.http.post(url, data, options)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getProfile(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),
    });
    let options = { headers: headers };
    // console.log("data--",data._id,data.name)
    let url = 'http://localhost:3000/profile/'+data._id;
    return this.http.get(url, options)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return localStorage.getItem('id_token') ? true : false;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}



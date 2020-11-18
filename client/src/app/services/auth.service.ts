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
  isTypeOrg: Boolean;
  constructor(private http: HttpClient) { }
  registerUser(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': localStorage.getItem('id_token'),   
    });
    let options = { headers: headers };
    if(localStorage.getItem('isOrg')=="false"){
      let url = 'http://localhost:3000/signup';
      return this.http.post(url, data, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
    else{
      let url = 'http://localhost:3000/signup/org';
      return this.http.post(url, data, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  }

  authenticateUser(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': localStorage.getItem('id_token'),   
    });
    let options = { headers: headers };
    if(localStorage.getItem('isOrg')=="false"){
      let url = 'http://localhost:3000/login';
      return this.http.post(url, data, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
    else{
      let url = 'http://localhost:3000/login/org';
      return this.http.post(url, data, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }

  }

  getProfile(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),
    });
    let options = { headers: headers };
    // console.log("data--",data._id,data.name)
    let url = 'http://localhost:3000/profile/'+data;
    return this.http.get(url, options)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getOrgProfile(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),
    });
    let options = { headers: headers };
    // console.log("data--",data._id,data.name)
    let url = 'http://localhost:3000/profile/org/'+data;
    return this.http.get(url, options)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getNetworkPost(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),
    });
    let options = { headers: headers };
    // console.log("data--",data._id,data.name)
    let url = 'http://localhost:3000/networkposts';
    return this.http.get(url, options)
      .pipe(
        catchError(this.errorMgmt)
      )
  } 

  like(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),
    });
    let options = { headers: headers };
    // console.log("data--",data._id,data.name)
    let url = 'http://localhost:3000/like';
    return this.http.post(url,data,options)
      .pipe(
        catchError(this.errorMgmt)
      )
  } 

  
  unlike(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),
    });
    let options = { headers: headers };
    // console.log("data--",data._id,data.name)
    let url = 'http://localhost:3000/unlike';
    return this.http.post(url,data,options)
      .pipe(
        catchError(this.errorMgmt)
      )
  } 

  storeUserData(token, user,isOrg) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // localStorage.setItem('isOrg',(isOrg));
    this.authToken = token;
    this.user = user;
  }

  isOrg(){
    if(localStorage.getItem('isOrg')=="true"){
      return true
    }
    else{
      return false
    }
  }
  isChosen(){
    return localStorage.getItem('isOrg')?true:false;
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



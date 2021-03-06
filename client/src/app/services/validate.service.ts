
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private http: HttpClient) { }
  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  //upload profile picture 
   createPost(data): Observable<any> {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('id_token'),   
  });
  let options = { headers: headers };
  console.log("data:",data)
  let url = 'http://localhost:3000/createpost/pic';
  return this.http.post(url, data, options)
    .pipe(
      catchError(this.errorMgmt)
    )
}


  //job detail 
  getJobDetail(data,isOrg): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),   
    });
    let options = { headers: headers };
    console.log("data:",data)
    if(isOrg()){
      let url = 'http://localhost:3000/jobdetail/org/'+data;
      return this.http.get(url, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
    else{
      let url = 'http://localhost:3000/jobdetail/'+data;
      return this.http.get(url, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
  }

  //update profile picture 
  updatePic(data,isOrg): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),   
    });
    let options = { headers: headers };
    console.log("data:",data)
    console.log("isOrg",isOrg())
    if(!isOrg()){
      let url = 'http://localhost:3000/updatepic';
      return this.http.post(url, data, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
    else{
      let url = 'http://localhost:3000/updateprofilepic';
      return this.http.post(url, data, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }
   
  }

  //Add skill
  addSkill(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),   
    });
    let options = { headers: headers };
    console.log("data:",data)
    let url = 'http://localhost:3000/addSkill/'+JSON.parse(localStorage.getItem('user'))._id;
    return this.http.post(url, data, options)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

    //Add edu
    addEdu(data): Observable<any> {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token'),   
      });
      let options = { headers: headers };
      console.log("data:",data)
      let url = 'http://localhost:3000/addEd/'+JSON.parse(localStorage.getItem('user'))._id;
      return this.http.post(url, data, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }

        //delete a job
        deleteJob(data): Observable<any> {
          let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('id_token'),   
          });
          let options = { headers: headers };
          console.log("data:",data)
          let url = 'http://localhost:3000/job/delete';
          return this.http.post(url, data, options)
            .pipe(
              catchError(this.errorMgmt)
            )
        }


   //connect
   connect(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),   
    });
    let options = { headers: headers };
    console.log("data:",data)
    let url = 'http://localhost:3000/connect';
    return this.http.post(url, data, options)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  
    //remove
    remove(data): Observable<any> {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token'),   
      });
      let options = { headers: headers };
      console.log("data:",data)
      let url = 'http://localhost:3000/remove';
      return this.http.post(url, data, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }

     //follow
   follow(data): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('id_token'),   
    });
    let options = { headers: headers };
    console.log("data:",data)
    let url = 'http://localhost:3000/follow';
    return this.http.post(url, data, options)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

       //unfollow
       unfollow(data): Observable<any> {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('id_token'),   
        });
        let options = { headers: headers };
        console.log("data:",data)
        let url = 'http://localhost:3000/unfollow';
        return this.http.post(url, data, options)
          .pipe(
            catchError(this.errorMgmt)
          )
      }

           //apply
          apply(data): Observable<any> {
            let headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('id_token'),   
            });
            let options = { headers: headers };
            console.log("data:",data)
            let url = 'http://localhost:3000/apply';
            return this.http.post(url, data, options)
              .pipe(
                catchError(this.errorMgmt)
              )
          }

    //update organisation profile
    updateOrgProfile(data): Observable<any> {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token'),   
      });
      let options = { headers: headers };
      console.log("data:",data)
      let url = 'http://localhost:3000/updateprofile';
      return this.http.post(url, data, options)
        .pipe(
          catchError(this.errorMgmt)
        )
    }

    // jobs
    getJobs(isOrg): Observable<any> {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('id_token'),   
      });
      let options = { headers: headers };
      if(isOrg()){
        let url = 'http://localhost:3000/joblist';
        return this.http.get(url, options)
          .pipe(
            catchError(this.errorMgmt)
          )
      }
      else{
        let url = 'http://localhost:3000/jobs';
        return this.http.get(url, options)
          .pipe(
            catchError(this.errorMgmt)
          )
      }

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


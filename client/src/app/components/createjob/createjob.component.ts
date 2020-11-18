declare var require: any
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';
//import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.css']
})
export class CreatejobComponent implements OnInit {

  job_title=""
  job_description=""
  skills_required=""
  location=""

  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  createJob(){
    const job = {
      job_title: this.job_title,
      job_description: this.job_description,
      skills_required:this.skills_required,
      location:this.location
    }
    // console.log(this.authService.isTypeOrg)
    this.authService.authenticateUser(job).subscribe(
      (res) => {
          console.log(res)
          // // console.log(res)
          // this.authService.storeUserData(res.token, res.org,true);
          // this.router.navigate(['/profile/org/'+res.org._id]);

      }, (error) => {
        console.log(error)
        this.router.navigate(['/login']);
      }
      );

  }

}

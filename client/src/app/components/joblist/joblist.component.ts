
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {

  jobs=[]

  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // console.log(this.authService.isTypeOrg)
    this.validateService.getJobs(this.authService.isOrg).subscribe(
      (res) => {
        console.log(res)
        this.jobs=res.posts

      }, (error) => {
        console.log(error)
        this.router.navigate(['/login']);
      }
      );
  }

  apply(job){
      return job.apply_by.slice(0,10)
  }
  
}

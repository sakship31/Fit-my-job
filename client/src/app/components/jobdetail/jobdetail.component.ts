import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.component.html',
  styleUrls: ['./jobdetail.component.css']
})
export class JobdetailComponent implements OnInit {


  job
  user
  applicants=[]
  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log("job id=",this.activatedRoute.snapshot.params.id )
    this.validateService.getJobDetail(this.activatedRoute.snapshot.params.id,this.authService.isOrg).subscribe(
      (res) => {
        console.log(res)
        this.job=res.post[0]
        this.user=res.user[0]
        this.applicants=res.post[0].applicants
        
      }, (error) => {
        console.log(error)
        //this.router.navigate(['/login']);
      }
      );
  }
  Slice(apply_by){
    return apply_by.slice(0,10)
}

applied(){
  if( this.applicants.indexOf(JSON.parse(localStorage.getItem('user'))._id) !==-1){
    
    return true
  }
  else{
    // console.log(this.applicants)
    // console.log()
    // console.log("yyyyyy")
    return false
  }
}

Apply(id){
  const jobId={
    jobId:id
  }
  this.validateService.apply(jobId).subscribe(
    (res) => {
      console.log(res)
      
    }, (error) => {
      console.log(error)
      //this.router.navigate(['/login']);
    }
    );
}

}

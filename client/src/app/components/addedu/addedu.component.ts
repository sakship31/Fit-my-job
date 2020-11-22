import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addedu',
  templateUrl: './addedu.component.html',
  styleUrls: ['./addedu.component.css']
})
export class AddeduComponent implements OnInit {

  uni_name=""
  study=""
  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onAddEdu(){
    const studies = {
      uni_name: this.uni_name,
      study: this.study
    }

    this.validateService.addEdu(studies).subscribe(
      (res) => {
        console.log(res)
        // console.log(res)
        // this.authService.storeUserData(res.token, res.user);
        this.router.navigate(['/profile/'+res._id]);
      }, (error) => {
        console.log(error)
        this.router.navigate(['/login']);
      }
      );
  }

}

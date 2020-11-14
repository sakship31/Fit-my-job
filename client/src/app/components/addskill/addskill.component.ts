declare var require: any
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addskill',
  templateUrl: './addskill.component.html',
  styleUrls: ['./addskill.component.css']
})
export class AddskillComponent implements OnInit {
  
  name="";
  url=""
  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.getItem('id_token') ? this.router.navigate(['/addSkill/'+JSON.parse(localStorage.getItem('user'))._id]) : this.router.navigate(['/login']);
  }
  onAddSkill(){
    const skill = {
      name: this.name,
      project_url: this.url
    }

    this.validateService.addSkill(skill).subscribe(
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

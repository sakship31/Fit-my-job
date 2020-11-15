import { Component, OnInit } from '@angular/core';
declare var require: any
import { AuthService } from '../../services/auth.service';
// import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';
//import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  about=""
  website_link=""
  location=""

  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onProfileSubmit(){
    
    
    const profile = {
      about: this.about,
      website_link: this.website_link,
      location:this.location
    }
    // console.log(this.authService.isTypeOrg)
    this.validateService.updateOrgProfile(profile).subscribe(
      (res) => {
          console.log(res)
          this.router.navigate(['/profile/org/'+res._id]);

      }, (error) => {
        console.log(error)
        this.router.navigate(['/login']);
      }
      );
  }

  onUpdateProfilePic(){
    this.router.navigate(['/updatePic']);
  }

}

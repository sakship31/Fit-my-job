declare var require: any
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';
//import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
const {URL,UPLOAD_PRESET,CLOUD_NAME}=require('../../config/keys') 

@Component({
  selector: 'app-orgprofile',
  templateUrl: './orgprofile.component.html',
  styleUrls: ['./orgprofile.component.css']
})
export class OrgprofileComponent implements OnInit {

 
  profile = "";
  name = "";
  id="";
  about="";
  website_link=""
  location=""
  userid=JSON.parse(localStorage.getItem('user'))._id;
  posts = [];
  followers=[]
  connections = [];
  skills=[];
  jobs=[]
  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    localStorage.getItem('id_token') ? console.log("") : this.router.navigate(['/login']);
    console.log(this.userid)
      this.authService.getOrgProfile(this.activatedRoute.snapshot.params.id).subscribe(
        (res) => {
          console.log("HEY",res)
          this.id=res.org[0]._id._id;
          this.name = res.org[0].name;
          this.profile = res.org[0].pic;
          this.followers = res.org[0].followers;
          this.website_link=res.org[0].website_link;
          this.location=res.org[0].location;
          this.about=res.org[0].about;
          this.jobs = res.jobs;
          console.log("profile=",this.profile)
          
        }, (error) => {
          console.log(error)
        }
      );
  }

  isOrg(){
    return this.authService.isTypeOrg
  }

  onAdd(){
    this.router.navigate(['/addSkill/'+JSON.parse(localStorage.getItem('user'))._id])
  }

  onUpdateProfile(){
    this.router.navigate(['/updateProfile'])
  }
  
  self(){
    if(this.userid==this.id){
      return true
    }
    else{
      return false
    }
  }
  
  followed(){
    if( this.followers.indexOf((this.userid)) !==-1){
      return true
    }
    else{
      return false
    }
  }

  Follow(){
      const followId={followId:this.id}
  
      this.validateService.follow(followId).subscribe(
        (res) => {
          console.log("Followedd")
          this.ngOnInit()
        }, (error) => {
          console.log(error)
        }
        );
  }

  Unfollow(){
    const unfollowId={unfollowId:this.id}
    this.validateService.unfollow(unfollowId).subscribe(
      (res) => {
        console.log("removed")
        this.ngOnInit()
      }, (error) => {
        console.log(error)
      }
      );
}


myImage:String = "assets/images/location.png";  

}

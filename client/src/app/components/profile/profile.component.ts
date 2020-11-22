declare var require: any
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';
//import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = "";
  name = "";
  id="";
  about="";
  email=""
  city=""
  state=""
  posts = [];
  connections = [];
  skills=[];
  education=[];
  all_users=[]
  // profile_all = "";
  // name_all = "";
  // id_all="";
  // about_all="";
  // email_all=""
  // city_all=""
  // state_all=""
  // posts_all = [];
  // connections_all = [];
  // skills_all=[];
  // education_all=[];
  userid=JSON.parse(localStorage.getItem('user'))._id;
  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.getItem('id_token') ? console.log("") : this.router.navigate(['/login']);
    console.log("okayyy=",this.userid)
      this.authService.getProfile(this.activatedRoute.snapshot.params.id).subscribe(
        (res) => {
          console.log("HEY",res)
          this.id=res.user[0]._id._id;
          this.name = res.user[0].name;
          this.profile = res.user[0].pic;
          this.connections = res.user[0].connections;
          this.education = res.user[0].education;
          this.skills=res.user[0].skills;
          this.posts = res.posts;
          this.about=res.user[0].about
          this.city=res.user[0].city
          this.state=res.user[0].state
          this.email=res.user[0].email
         ///////////////////////////////////////////////
         this.authService.getProfileAll().subscribe(
          (res) => {
            console.log("HEY222=",res.users)
            this.all_users=res.users
            // this.id_all=res.users._id._id;
            // this.name_all = res.users[0].name;
            // this.profile_all = res.users[0].pic;
            // this.connections_all = res.users[0].connections;
            // this.education_all = res.users[0].education;
            // this.skills_all=res.users[0].skills;
            // this.about_all=res.users[0].about
            // this.city_all=res.users[0].city
            // this.state_all=res.users[0].state
            // this.email_all=res.users[0].email
          }, (error) => {
            console.log(error)
          }
        );
         //////////////////////////////////////////////
        }, (error) => {
          console.log(error)
        }
      );
      // console.log("name==",this.name)
  }

  isOrg(){
    return this.authService.isTypeOrg
  }

  onAddSkill(){
    this.router.navigate(['/addSkill/'+JSON.parse(localStorage.getItem('user'))._id])
  }
  onAddEd(){
    this.router.navigate(['/addEd/'+JSON.parse(localStorage.getItem('user'))._id])
  }

  onUpdatePic(){
    this.router.navigate(['/updatePic/'])
  }
  
  self(){
    if(this.userid==this.id){
      return true
    }
    else{
      return false
    }
  }
  
  connected(){
    if( this.connections.indexOf((this.userid)) !==-1){
      return true
    }
    else{
      return false
    }
  }

  Connect(){
      const followId={followId:this.id}
  
      this.validateService.connect(followId).subscribe(
        (res) => {
          console.log(res)
          this.ngOnInit()
          // this.router.navigate(['/profile/'+res.user._id]);
        }, (error) => {
          console.log(error)
        }
        );
  }

  Remove(){
    const unfollowId={unfollowId:this.id}
    this.validateService.remove(unfollowId).subscribe(
      (res) => {
        this.ngOnInit()
        console.log("removed")
        // this.router.navigate(['/profile/'+res.user._id]);
      }, (error) => {
        console.log(error)
      }
      );
}
myImage:String = "assets/images/location.png";  


}

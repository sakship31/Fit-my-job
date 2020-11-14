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
  userid=JSON.parse(localStorage.getItem('user'))._id;
  posts = [];
  connections = [];
  skills=[];
  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.getItem('id_token') ? console.log("") : this.router.navigate(['/login']);
    // this.userid = localStorage.getItem('user')
    //this.router.navigate(['/profile/'+JSON.parse(localStorage.getItem('user'))._id])
    console.log(this.userid)
    this.authService.getProfile(this.activatedRoute.snapshot.params.id).subscribe(
      (res) => {
        console.log("HEY",res)
        this.id=res.user[0]._id._id;
        this.name = res.user[0].name;
        this.profile = res.user[0].pic;
        this.connections = res.user[0].connections;
        this.skills=res.user[0].skills;
        this.posts = res.posts;
        
      }, (error) => {
        console.log(error)
      }
    );
    // console.log("name==",this.name)
  }
  onAdd(){
    this.router.navigate(['/addSkill/'+JSON.parse(localStorage.getItem('user'))._id])
  }

  onUpdatePic(){
    this.router.navigate(['/updatePic/'])
  }
  
  self(){
    // console.log("curr user id=",JSON.parse(localStorage.getItem('user'))._id)
    // console.log("url user id=",this.id)
    // this.userid=JSON.parse(localStorage.getItem('user'))._id
    // console.log("%",this.userid)
    if(this.userid==this.id){
      // console.log("haha",this.userid,this.id)
      return true
    }
    else{
      return false
    }
  }
  
  connected(){
    // console.log("userid=",JSON.stringify(this.userid))
    // console.log("type(userid)=",typeof(JSON.stringify(this.userid)))
    // console.log("connections=",this.connections[0])
    // console.log("type(connections)=",typeof(this.connections[0]))
    // if(JSON.stringify(this.userid)==this.connections[0]){
    //   console.log("hellooooo")
    // }
    // console.log(this.connections.indexOf(JSON.stringify(this.userid)))
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


}

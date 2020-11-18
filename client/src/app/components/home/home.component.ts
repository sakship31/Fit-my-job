declare var require: any
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
// import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';
//import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userid=JSON.parse(localStorage.getItem('user'))._id;
  status="like"
  toggle = true;
  posts=[]


  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.getNetworkPost().subscribe(
      (res) => {
        console.log("HEY222",res)
        this.posts=res.posts
      }, (error) => {
        console.log(error)
      }
    );
  }

  liked(post){
    if( post.likes.indexOf((this.userid)) !==-1){
      return true
    }
    else{
      return false
    }
  }

  like(post){
    const postId={
      postId:post._id
    }
    this.authService.like(postId).subscribe(
      (res) => {
        console.log("liked",res)
        post.likes.length++
        this.ngOnInit()
      }, (error) => {
        console.log(error)
      }
    );
  }

  unlike(post){
    const postId={
      postId:post._id
    }
    this.authService.unlike(postId).subscribe(
      (res) => {
        console.log("unliked",res)
        post.likes.length--
        
        this.ngOnInit()
      }, (error) => {
        console.log(error)
      }
    );
  }

}

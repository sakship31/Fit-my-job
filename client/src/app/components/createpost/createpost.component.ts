import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import {ValidateService} from '../../services/validate.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
const {URL,UPLOAD_PRESET,CLOUD_NAME}=require('../../config/keys') 
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  caption="";
  pic="";
  image:File=null;

  constructor(
    private validateService:ValidateService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    localStorage.getItem('id_token') ? this.router.navigate(['/createPost']) : this.router.navigate(['/login']);
  }
  
  onFileSelected(event){
    this.image=<File>event.target.files[0]
    console.log("dsjskj==",(this.image))
  }

  onCreatePost(){
    
      const data = new FormData()
      data.append("file",this.image)
      data.append("upload_preset",UPLOAD_PRESET)
      data.append("cloud_name",CLOUD_NAME)
      axios.post(URL,data,{headers:{"Content-Type": "multipart/form-data"}})
      .then(res=>res)
      .then(data=>{
          console.log(data.data.url)
          this.pic=data.data.url
          const post={
            caption:this.caption,
            pic:this.pic
          }
          this.validateService.createPost(post).subscribe(
            (res) => {
              console.log(res)
              // console.log(res)
              // this.authService.storeUserData(res.token, res.user);
              this.router.navigate(['/profile/'+res.postedBy._id]);
            }, (error) => {
              console.log(error)
              this.router.navigate(['/login']);
            }
            );
        })
      .catch(err=>{
          console.log(err)
      })
   
      ////node server 
  }
}

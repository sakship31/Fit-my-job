
declare var require: any
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
const {URL,UPLOAD_PRESET,CLOUD_NAME}=require('../../config/keys') 

@Component({
  selector: 'app-updatepic',
  templateUrl: './updatepic.component.html',
  styleUrls: ['./updatepic.component.css']
})
export class UpdatepicComponent implements OnInit {

  image:File=null
  pic=""
  constructor(
    private validateService:ValidateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    this.image=<File>event.target.files[0]
    console.log("dsjskj==",(this.image))
  }

  onUpdatePic(){
    
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
            pic:this.pic
          }
          this.validateService.updatePic(post).subscribe(
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
        })
      .catch(err=>{
          console.log(err)
      })
   
      ////node server 
  }
}


declare var require: any
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
const {URL,UPLOAD_PRESET,CLOUD_NAME}=require('../../config/keys') 

@Component({
  selector: 'app-updatepic',
  templateUrl: './updatepic.component.html',
  styleUrls: ['./updatepic.component.css']
})
export class UpdatepicComponent implements OnInit {
  closeResult = '';
  
  image:File=null
  pic=""
  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private router: Router,

    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    this.image=<File>event.target.files[0]
    console.log("dsjskj==",(this.image))
  }

  open(content) { 
    this.modalService.open(content, 
   {ariaLabelledBy: 'modal-basic-title'}).result
   .then((result)  => { 
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => { 
      this.closeResult =  
         `Dismissed ${this.getDismissReason(reason)}`; 
    }); 
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
          this.validateService.updatePic(post,this.authService.isOrg).subscribe(
            (res) => {
              // console.log(res)
              if(localStorage.getItem('isOrg')=='true'){
                this.router.navigate(['/profile/org/'+res._id]);
              }
              else{
                this.router.navigate(['/profile/'+res._id]);
              }
            
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
  


  private getDismissReason(reason: any): string { 
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC'; 
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      return 'by clicking on a backdrop'; 
    } else { 
      return `with: ${reason}`; 
    } 
  }
}

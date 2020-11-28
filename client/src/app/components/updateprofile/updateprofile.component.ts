import { Component, OnInit } from '@angular/core';
declare var require: any
import { AuthService } from '../../services/auth.service';
import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';
//import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
const {URL,UPLOAD_PRESET,CLOUD_NAME}=require('../../config/keys') 
@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {
  closeResult = '';
  about=""
  website_link=""
  location=""
  pic=""
  image:File=null
  profile = "";
  id="";
  name = "";

  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.authService.getOrgProfile(JSON.parse(localStorage.getItem('user'))._id).subscribe(
      (res) => {
        console.log("HEY from uodate org profile-",res)
        // this.website_link=res.org[0].website_link;
        // this.location=res.org[0].location;
        // this.about=res.org[0].about;
        // this.skills=res.user[0].skills;
        // this.jobs = res.jobs;
        // console.log("profile=",this.profile)
        this.profile = res.org[0].pic;
        this.name = res.org[0].name;
      }, (error) => {
        console.log(error)
      }
    );
    

  }

  

  onProfileSubmit(){
    console.log("helloooooo")
    this.authService.getOrgProfile(JSON.parse(localStorage.getItem('user'))._id).subscribe(
      (res) => {
        console.log("HEY from uodate org profile-",res)
        // this.website_link=res.org[0].website_link;
        // this.location=res.org[0].location;
        // this.about=res.org[0].about;
        // this.skills=res.user[0].skills;
        // this.jobs = res.jobs;
        // console.log("profile=",this.profile)
        if(this.about==''){
          this.about=res.org[0].about;
        }
  
          if(this.location==''){
            this.location=res.org[0].location;
          } 
        
            if(this.website_link==''){
              this.website_link=res.org[0].website_link;
            }
            
            this.profile = res.org[0].pic;
       
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
        
      }, (error) => {
        console.log(error)
      }
    );
    

  }

  onUpdatePic(){
      // this.router.navigate(['/updatePic/'])
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
                console.log(res)
                // console.log(res)
                // this.authService.storeUserData(res.token, res.user);
                if(localStorage.getItem('isOrg')=='true'){
                  this.router.navigate(['/profile/org/'+res._id]);
                }
                else{
                  this.router.navigate(['/profile/'+res._id]);
                  this.modalService.dismissAll();
                  this.ngOnInit();
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

    // Modal
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

// modal
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

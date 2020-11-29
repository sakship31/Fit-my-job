declare var require: any
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import axios from 'axios';
import { Router } from '@angular/router';
import {ValidateService} from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
const {URL,UPLOAD_PRESET,CLOUD_NAME}=require('../../config/keys') 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  closeResult = '';
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
  image:File=null
  pic=""
  userid=JSON.parse(localStorage.getItem('user'))._id;
  constructor(
    private authService: AuthService,
    private validateService:ValidateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    localStorage.getItem('id_token') ? console.log("") : this.router.navigate(['/login']);
      this.authService.getProfile(this.activatedRoute.snapshot.params.id).subscribe(
        (res) => {
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
         this.authService.getProfileAll().subscribe(
          (res) => {
            this.all_users=res.users
          }, (error) => {
            console.log(error)
          }
        );
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

  onFileSelected(event){
    this.image=<File>event.target.files[0]
    console.log("dsjskj==",(this.image))
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
         
                // this.router.navigate(['/profile/'+res._id]);
                this.modalService.dismissAll();
                this.ngOnInit();
            
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




myImage:String = "assets/images/location.png";  


}

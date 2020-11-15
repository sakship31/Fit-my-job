import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    console.log("check--",typeof(localStorage.getItem('isOrg')))
    console.log("check--",(localStorage.getItem('isOrg')))
  }
  onLoginSubmit(){
    
    const user = {
      email: this.email,
      password: this.password
    }
    // console.log(this.authService.isTypeOrg)
    this.authService.authenticateUser(user).subscribe(
      (res) => {
        if(localStorage.getItem('isOrg')=="true"){
          console.log(res.org)
          // console.log(res)
          this.authService.storeUserData(res.token, res.org,true);
          this.router.navigate(['/profile/org/'+res.org._id]);
        }
        else{
          console.log(res.user)
          // console.log(res)
          this.authService.storeUserData(res.token, res.user,false);
          this.router.navigate(['/profile/'+res.user._id]);
        
        }

      }, (error) => {
        console.log(error)
        this.router.navigate(['/login']);
      }
      );
  }

}

import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router';
// // import {FlashMessagesService} from 'angular2-flash-messages';
// import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  city: String;
  state: String;
  about: String;

  constructor(private validateService: ValidateService,private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }
   
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      about:this.about,
      city:this.city,
      state:this.state
    }
        // Validate Email
        if(!this.validateService.validateEmail(user.email)){
          console.log("enter a valid email address")
          return false;
        }
        
    // Register user
    this.authService.registerUser(user).subscribe(
    (res) => {
      console.log(res)
      this.router.navigate(['/login']);
    }, (error) => {
      console.log('heyyyy',error)
      // console.log(error);
      this.router.navigate(['/register']);
    }
    );
  }
}

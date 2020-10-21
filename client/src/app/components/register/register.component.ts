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

  constructor(private validateService: ValidateService,private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }
   
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }
        // Validate Email
        if(!this.validateService.validateEmail(user.email)){
          // // this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
          // this.ngFlashMessageService.showFlashMessage
          // ({
          //   // Array of messages each will be displayed in new line
          //   messages: ["Please use a valid email"], 
          //   // Whether the flash can be dismissed by the user defaults to false
          //   dismissible: true, 
          //   // Time after which the flash disappears defaults to 2000ms
          //   timeout: 3000,
          //   // Type of flash message, it defaults to info and success, warning, danger types can also be used
          //   type: 'danger'
          // });
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

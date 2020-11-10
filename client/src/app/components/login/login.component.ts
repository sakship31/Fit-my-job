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
  }
  onLoginSubmit(){
    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(
      (res) => {
        console.log(res.user)
        // console.log(res)
        this.authService.storeUserData(res.token, res.user);
        this.router.navigate(['/profile/'+res.user[0]._id]);
      }, (error) => {
        console.log(error)
        this.router.navigate(['/login']);
      }
      );
  }

}

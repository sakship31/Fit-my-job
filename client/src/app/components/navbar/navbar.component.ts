import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
     console.log(this.authService.isChosen())
  }



  getId(){
      return JSON.parse(localStorage.getItem('user'))._id
  }
  
  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
    return false;
  }

}

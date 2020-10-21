import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    localStorage.getItem('id_token')?this.router.navigate(['/profile']):this.router.navigate(['/login']);
  }
   


}

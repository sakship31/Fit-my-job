import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  image = "";
  name = "";
  posts = [];
  connections = [];
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.getItem('id_token') ? this.router.navigate(['/profile/'+JSON.parse(localStorage.getItem('user'))._id]) : this.router.navigate(['/login']);
    let user = localStorage.getItem('user')
    console.log(JSON.parse(user))
    this.authService.getProfile(JSON.parse(user)).subscribe(
      (res) => {
        console.log(res)
        console.log(typeof (res.user))
        this.name = res.user[0].name;
        this.image = res.user[0].pic;
        this.connections = res.user[0].connections;
        this.posts = res.posts;
      }, (error) => {
        console.log(error)
      }
    );
    // console.log("name==",this.name)
  }




}

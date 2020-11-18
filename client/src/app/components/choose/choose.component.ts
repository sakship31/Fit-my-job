import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  
  organisation(){
    const isOrg="true"
    localStorage.setItem('isOrg',(isOrg));
    this.router.navigate(['/login']);
  }

  normalUser(){
    const isOrg="false"
    localStorage.setItem('isOrg',(isOrg));
    this.router.navigate(['/login']);
  }
  


}

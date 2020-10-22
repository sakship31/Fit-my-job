import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.getItem('id_token') ? this.router.navigate(['/createPost']) : this.router.navigate(['/login']);
  }

}

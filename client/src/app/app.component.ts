import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(public routert: Router, public userService: UserService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
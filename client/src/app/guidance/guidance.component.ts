import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/services/user.service';
import { NgbAccordionConfig, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-guidance',
  templateUrl: './guidance.component.html',
  styleUrls: ['./guidance.component.scss'],providers: [NgbAccordionConfig], 
})
export class GuidanceComponent implements OnInit {

  sub: Subscription;
  userName = "";
  constructor(public routert: Router, public userService: UserService,config: NgbAccordionConfig) {
    config.closeOthers = true;
		config.type = 'info';
  }

  ngOnInit(): void {
    this.userService.currentUsers.next(this.userService.getFromStorage());
    this.sub = this.userService.currentUsers.subscribe(data => { this.userName = data ? data[0].FirstName+" "+data[0].LastName : "" })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}

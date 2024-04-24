import { Component, OnInit } from '@angular/core';
import {
  faCircleCheck,
  faCircleExclamation
 } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faCircleCheck = faCircleCheck;
  faCircleExclamation = faCircleExclamation;

}

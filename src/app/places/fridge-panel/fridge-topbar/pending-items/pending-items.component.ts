import { Component, OnInit } from '@angular/core';
import {faCalendarDays,faListOl} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-pending-items',
  templateUrl: './pending-items.component.html',
  styleUrls: ['./pending-items.component.css']
})
export class PendingItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  faCalendarDays = faCalendarDays;
  faListOl = faListOl;

}

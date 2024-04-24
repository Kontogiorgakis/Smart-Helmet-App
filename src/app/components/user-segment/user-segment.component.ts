import { Component, OnInit, ViewChild } from '@angular/core';
import {Router } from '@angular/router';
import { InsideHomeComponent } from 'src/app/pages/home/inside-home/inside-home.component';


@Component({
  selector: 'app-user-segment',
  templateUrl: './user-segment.component.html',
  styleUrls: ['./user-segment.component.css'],
  providers: [InsideHomeComponent]
})

export class UserSegmentComponent implements OnInit {
  constructor(private router: Router) {}

  public fridge(){
    this.router.navigateByUrl('/home?tab=fridge')
  }

  public cupboard(){
    this.router.navigateByUrl('/home?tab=cupboard')
  }

  public bathroom(){
    this.router.navigateByUrl('/home?tab=bathroom')
  }


  public favorite(){
    this.router.navigateByUrl('/favorite')
  }

  ngOnInit(): void {
  }

}

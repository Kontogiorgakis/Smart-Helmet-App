import { Component, OnInit} from '@angular/core';
import {
         faBell,
         faUser,
         faChevronLeft,
        } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import {Location} from '@angular/common';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  //arrow User
  arrow:boolean = false;
  face:boolean = true;

  //togglers
  toggleUser:boolean = false;
  toggleNotifications:boolean=false;

  constructor(private router: Router, private _location: Location) {
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if(this.router.url==="/"){
        this.arrow=false;
        this.face=true;
      }else{
        this.toggleUser = false;
        this.arrow=true;
        this.face=false;
      }
    });
  }

  ngOnInit(): void {
  }

  public back(){
    if(this.router.url==="/extras" || this.router.url.split('?')[0]==="/home" || this.router.url.split('?')[0]==="/add"){
      this.router.navigateByUrl('/')
    }else if(this.router.url==="/home/meats"){
      this.router.navigateByUrl('/home')
    }else{
      this._location.back();
    }
  }

  public goToList(){
    this.router.navigateByUrl('/')
  }

  public user(){
    this.toggleUser=!this.toggleUser;
  }

  public notifications(){
    this.toggleNotifications=!this.toggleNotifications
  }

  title = 'Angular-app';
  faBell = faBell;
  faUser = faUser;
  faChevronLeft = faChevronLeft;
}

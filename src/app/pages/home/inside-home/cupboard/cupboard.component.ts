import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-cupboard',
  templateUrl: './cupboard.component.html',
  styleUrls: ['./cupboard.component.css']
})
export class CupboardComponent implements OnInit {

  //Interactive Products
  snacks:boolean = false;
  spices:boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
      });
  }

  ngOnInit(): void {
    console.log("asdf")
    this.snacks = false;
  }

  public snacksRedirect(){
    document.getElementById('categories')?.setAttribute("style","filter: blur(1px);")
    this.snacks=true
  }

  public spicesRedirect(){
    this.spices=true
  }

}

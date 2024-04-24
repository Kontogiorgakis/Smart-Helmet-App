import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-fridge-meats',
  templateUrl: './fridge-meats.component.html',
  styleUrls: ['./fridge-meats.component.css']
})
export class FridgeMeatsComponent implements OnInit {

  chicken:boolean = false;


  constructor(private router:Router) {
  }

  ngOnInit(): void {
  }
  public fridge(){
    this.router.navigateByUrl('/fridge')
  }

  public chickenRedirect(){
    //console.log("Chicken Going through")
    this.chicken = true;
    document.getElementById('panel')?.setAttribute("style","filter:blur(3px)")
  }
}

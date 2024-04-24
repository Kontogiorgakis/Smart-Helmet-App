import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-fridge-fruits',
  templateUrl: './fridge-fruits.component.html',
  styleUrls: ['./fridge-fruits.component.css']
})
export class FridgeFruitsComponent implements OnInit {

  fruits:boolean = false;


  constructor(private router:Router) {
  }

  ngOnInit(): void {
  }
  public fridge(){
    this.router.navigateByUrl('/fridge')
  }

  public tropicalRedirect(){
    this.fruits = true;
    document.getElementById('panel')?.setAttribute("style","filter:blur(3px)")
  }

}


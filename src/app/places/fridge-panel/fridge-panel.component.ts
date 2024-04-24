import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fridge-panel',
  templateUrl: './fridge-panel.component.html',
  styleUrls: ['./fridge-panel.component.css']
})
export class FridgePanelComponent implements OnInit {

  constructor(private router: Router) {}

  like:boolean = false;
  soda:boolean = false;

  ngOnInit(): void {
  }
  public sodaRedirect(){
    document.getElementById('panel')?.setAttribute("style","filter:blur(3px)")
    this.soda=!this.soda
  }

  public meatsRedirect(){
    this.router.navigateByUrl('/fridge/meats');
  }

  public fruitsRedirect(){
    console.log("asdf")
    this.router.navigateByUrl('/fridge/fruits');
  }

}

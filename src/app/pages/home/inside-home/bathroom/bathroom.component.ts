import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bathroom',
  templateUrl: './bathroom.component.html',
  styleUrls: ['./bathroom.component.css']
})
export class BathroomComponent implements OnInit {

  oral:boolean = false

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.oral=false;
  }

  public oralRedirect(){
    console.log("Lmeat")
    this.oral=true
  }

}

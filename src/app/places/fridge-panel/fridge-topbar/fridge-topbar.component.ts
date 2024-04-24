import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fridge-topbar',
  templateUrl: './fridge-topbar.component.html',
  styleUrls: ['./fridge-topbar.component.css']
})
export class FridgeTopbarComponent implements OnInit {

  like:boolean = false;
  pending:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public pendingItems(){
    console.log("asd")
    this.pending=!this.pending
  }

  public likeRedirect(){
    this.like = !this.like;
    if(this.like){
      document.getElementById('panel')?.setAttribute("style","filter:blur(3px)")
      document.getElementById('pending')?.setAttribute("style","pointer-events:none")
      document.getElementById('search')?.setAttribute("style","pointer-events:none")
    }else{
      document.getElementById('panel')?.setAttribute("style","filter:blur(0px)")
      document.getElementById('pending')?.setAttribute("style","pointer-events:auto")
      document.getElementById('search')?.setAttribute("style","pointer-events:auto")
    }
  }

}

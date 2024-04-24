import { Component, OnInit } from '@angular/core';
import { faHeart, faXmark} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oral',
  templateUrl: './oral.component.html',
  styleUrls: ['./oral.component.css']
})
export class OralComponent implements OnInit {
  //array of items
  items = ["Chips","Pop Corn","Biscuits","Snack Bars","Crackers"] 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public counter(){
    //console.log("NTOOUT")
  }

  public addItem(num: number){
    this.router.navigateByUrl('/add?tab='+this.items[num]+'')
  }

  public redirect(){
    this.router.navigateByUrl('/home?tab=cupboard')
  }

  faHeart = faHeart;
  faXmark = faXmark
}

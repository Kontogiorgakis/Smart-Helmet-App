import { Component, OnInit } from '@angular/core';
import { faHeart, faXmark} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chicken-segment',
  templateUrl: './chicken-segment.component.html',
  styleUrls: ['./chicken-segment.component.css']
})
export class ChickenSegmentComponent implements OnInit {

  //array of items
  items = ["Whole","Breasts","Drums","Thighs","Legs","Wings"] 

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public counter(){
    console.log("NTOOUT")
  }

  public addItem(num: number){
    this.router.navigateByUrl('/add?tab='+this.items[num]+'')
  }

  public redirect(){
    this.router.navigateByUrl('/home/meats')
  }

  faHeart = faHeart;
  faXmark = faXmark
}

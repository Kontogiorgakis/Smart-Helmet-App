import { Component, OnInit } from '@angular/core';
import { faHeart, faXmark, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fridge-like',
  templateUrl: './fridge-like.component.html',
  styleUrls: ['./fridge-like.component.css']
})
export class FridgeLikeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public back(){
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  faHeart = faHeart;
  faXmark = faXmark;
  faChevronRight = faChevronRight;

}

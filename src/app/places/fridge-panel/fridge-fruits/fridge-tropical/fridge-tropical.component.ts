import { Component, OnInit } from '@angular/core';
import { faHeart, faXmark, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fridge-tropical',
  templateUrl: './fridge-tropical.component.html',
  styleUrls: ['./fridge-tropical.component.css']
})
export class FridgeTropicalComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    document.getElementById('topbar')?.setAttribute("style","pointer-events:none")
  }

  public back(){
    document.getElementById('topbar')?.setAttribute("style","pointer-events:auto")
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  faHeart = faHeart;
  faXmark = faXmark;
  faChevronRight = faChevronRight;
}

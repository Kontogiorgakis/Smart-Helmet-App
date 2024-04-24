import { Component, OnInit } from '@angular/core';
import {faSliders,
        faMagnifyingGlass,
        faChevronRight,
        faSmile,
        faFaceFrown,
        faFaceMeh,
        faClock} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.css']
})
export class ExtrasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public redirect(){
    this.router.navigateByUrl('/extras/recipe')
  }

  faSliders = faSliders;
  faMagnifyingGlass = faMagnifyingGlass;
  faChevronRight = faChevronRight;
  faSmile = faSmile;
  faFaceFrown = faFaceFrown;
  faFaceMeh = faFaceMeh;
  faClock = faClock;
}

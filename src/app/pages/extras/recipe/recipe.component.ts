import { Component, OnInit } from '@angular/core';
import {faFaceMeh} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public addItem(){
    this.router.navigateByUrl('/add?tab=Basil')
  }

  faFaceMeh = faFaceMeh;
}

import { Component, OnInit } from '@angular/core';
import {faKitchenSet,
        faCalendar,
        faBath,
        faMagnifyingGlass,
        faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CupboardComponent } from './cupboard/cupboard.component';

@Component({
  selector: 'app-inside-home',
  templateUrl: './inside-home.component.html',
  styleUrls: ['./inside-home.component.css']
})
export class InsideHomeComponent implements OnInit {

  //Active Tab
  activeTab="fridge"

  //filter
  filter$: Observable<string> | undefined;

  //Getters
  getter = new CupboardComponent(this.router)


  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {  
    this.filter$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('tab')||"fridge"),
    );

    // subscribe and log the params when they change
    // you could set to an internal variable or
    // bind the filter$ directly to the async pipe
    // ultimatecourses.com/blog/angular-ngfor-async-pipe
    this.filter$.subscribe(param =>{
      if(param===null)
        return
      if(["fridge","cupboard","bathroom"].includes(param)){
        this.activeTab=param
      }
    });
  }

  public redirect(){
    this.router.navigateByUrl('/home/meats')
  }

  public fridge(){
    this.router.navigateByUrl('/home?tab=fridge')
  }

  public cupboard(){
    this.router.navigateByUrl('/home?tab=cupboard')
  }

  public bathroom(){
    this.router.navigateByUrl('/home?tab=bathroom')
  }

  faKitchenSet = faKitchenSet;
  faCalendar = faCalendar;
  faBath = faBath;
  faMagnifyingGlass = faMagnifyingGlass;
  faChevronRight = faChevronRight;
}

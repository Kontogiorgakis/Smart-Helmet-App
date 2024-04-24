import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public redirect(){
    this.router.navigateByUrl('/home/meats')
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meats',
  templateUrl: './meats.component.html',
  styleUrls: ['./meats.component.css']
})
export class MeatsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public redirect(){
    this.router.navigateByUrl('/home/meats/chicken')
  }

}

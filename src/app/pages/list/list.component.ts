import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faB,faCheck, faChevronDown, faChevronUp,faPlus, faCircle, faTrashCan, faHeart} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  //status
  buy:boolean = false;
  checked:boolean = false;

  //chevrons for informations
  up:boolean = false;
  down:boolean = true;


  //informations
  infos:boolean = false;
  
  //filters
  all:boolean = true;
  bought:boolean = false;
  stored:boolean = false;
  not:boolean = false;


  constructor(private router: Router) {}


  ngOnInit(): void {
  }

  public status(){
    if(this.buy){
      this.checked=true;
      this.buy=false;
    }
    if(!this.buy && !this.checked){
      this.buy=true
    }

  }


  public toggle(){
    if(this.infos){
      this.down=true;
      this.up=false;    
      this.infos=false;
    }else{
      this.down=false;
      this.up=true;
      this.infos=true;
    }
  }

  public selected(type: string){
    if(type==="all"){
      this.all=true; 
      this.bought=false;
      this.stored=false;
      this.not=false;
    }else if(type==="bought"){
      this.all=false;
      this.bought=true;
      this.stored=false;
      this.not=false;
    }else if(type==="stored"){
      this.all=false;
      this.bought=false;
      this.stored=true;
      this.not=false;
    }else if(type==="not"){
      this.all=false;
      this.bought=false;
      this.stored=false;
      this.not=true;
    }
      
  }

  public addItem(){
    this.router.navigateByUrl('/add')
  }

  faB = faB;
  faCheck = faCheck;
  faChevronDown = faChevronDown;
  faPlus = faPlus;
  faCircle = faCircle; 
  faTrashCan = faTrashCan;
  faHeart = faHeart;
  faChevronUp = faChevronUp;
}

import { Component, OnInit, AfterViewInit} from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SocketsService } from '../global/services/sockets/sockets.service';



@Component({
  selector: 'app-reducer',
  templateUrl: './reducer.component.html',
  styleUrls: ['./reducer.component.css']
})
export class ReducerComponent {

  spin:boolean = false;


  constructor(private router: Router,private socketService: SocketsService){
  }
  ngOnInit(): void{}

  public startOculus(){
    this.spin = true;
    setTimeout(() => this.redirectHome(), 3000);
    //document.getElementById('lens')?.setAttribute("style","animation: wave 2s ease-out infinite;")
    const textElement = document.getElementById('pairing') as HTMLElement; // Replace '.my-text' with your own CSS class or ID
    textElement.style.display = "block";
    let dots = '';

    setInterval(() => {
      if (dots.length > 5) {
        dots = '';
      }
      dots += ' .';
      textElement.innerHTML = `Pairing helmet ${dots}`;
    }, 500);


  }

  public redirectHome(){
    console.log(this.router);

    if(this.router){
      this.router.navigateByUrl('/homepage');
    }
  }

  //Delete Task

  ngAfterViewInit(): void {}
}

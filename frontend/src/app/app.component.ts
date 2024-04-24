import { Component, OnInit, AfterViewInit} from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ProductModel } from './global/models/product/product.model';
import { ShopModel } from './global/models/shops/shop.model';
import { SocketsService } from './global/services/sockets/sockets.service';
import { ProductService } from './global/services/tasks/products.service';
import { ShopService } from './global/services/tasks/shops.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  spin:boolean = false;


  constructor(private router: Router,private productService: ProductService,private shopService: ShopService,private socketService: SocketsService){
  }
  ngOnInit(): void{
    this.router.navigateByUrl('/homepage');
  }

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

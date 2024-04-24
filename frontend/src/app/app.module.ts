import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

/*Mines*/
import { FormsModule } from '@angular/forms';
import { ReducerComponent } from './reducer/reducer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MapComponent } from './map/map.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

//Google Maps
import { GoogleMapsModule } from '@angular/google-maps'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OpenComponent } from './open/open.component';

const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    AppComponent,

    ReducerComponent,

    /*SmartHlmet*/
    HomepageComponent,
    MapComponent,
    OpenComponent,
  ],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

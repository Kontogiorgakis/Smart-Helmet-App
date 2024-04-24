import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from '../global/services/tasks/notifications.service';
import { SocketsService } from '../global/services/sockets/sockets.service';
import { map } from 'lodash';
import { GoogleMap } from '@angular/google-maps';
import { faRoute, faClock, faArrowsToCircle, faLocationArrow, faPlus} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false })
  map!: GoogleMap;
  @ViewChild('original') original!: google.maps.Marker

  /*Refocusing*/
  public refocus = false;

  ngAfterViewInit() {
    const radius = 2000; // radius in meters

   const circleOptions = {
      center: this.center || { lat: 0, lng: 0 }, // default center is 0,0 if this.center is undefined or null
      radius: radius,
    };

    const circle = new google.maps.Circle(circleOptions);

    if (this.map.googleMap) {
      google.maps.event.addListener(this.map.googleMap, 'bounds_changed', () => {
        const mapCenter = this.map.getCenter();
        if (mapCenter && !circle.getBounds()?.contains(mapCenter)) {
          this.refocus = true;
          this.cdr.detectChanges();
        }else{
          this.refocus = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  public centerToOrigin(){
    // Center the map to the position
    if (this.map.googleMap) {
      this.map.googleMap.panTo(this.center);
    }
  }

  constructor(private router: Router,private notificationService: NotificationsService, private socketService: SocketsService, private cdr: ChangeDetectorRef) { }

  /*Route*/

  public routerOriginDestination(destLat?: number, destLng?: number){

    if (destLat === undefined || destLng === undefined) {
      console.error('Destination latitude or longitude is undefined');
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      map: this.map.googleMap,
      polylineOptions: {
        strokeColor: 'purple',
        strokeOpacity: 1
      }
    });

    const request = {
      origin: new google.maps.LatLng(35.329175, 25.135219),
      destination: new google.maps.LatLng(destLat, destLng),
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (result: any, status: any) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }








  /*Destination*/
  public destinationInformation:boolean = false;
  public markerClicked = false;
  public street = "none"
  public under = "none"



  /*Origin*/
  public originInformation:boolean = false;
  public originLat:number = 0
  public originLon:number = 0
  position: google.maps.LatLngLiteral ={
    lat: 35.329175,
    lng: 25.135219
  };
  title: string= "AAAAA"
  optionsMarker: google.maps.MarkerOptions = {
    animation: google.maps.Animation.DROP,
    draggable: false,
    icon:"../../assets/helmie/motoriOrigin.png",
    opacity: 1.0,
  }


  /*Create the map*/
  center: google.maps.LatLngLiteral = {
    lat: 35.329175,
    lng: 25.135219
  };
  zoom = 16;
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 10,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e",
          }
        ]
      },
      {
        featureType: "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#040213",
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      // Add more style rules here
    ]
  };

  /*Marker array*/
  markers: google.maps.Marker[] = [

  ];




  ngOnInit(): void {
    this.notificationService.getAll().subscribe((result) => {
      for(let res of result){
        this.originLat = Number(res.lat)
        this.originLon = Number(res.lon)
      }
    });
  }

  public addMarker(event: google.maps.MapMouseEvent){
    if(!this.markerClicked){
      // create a new marker
      const marker = new google.maps.Marker({
        position: event.latLng,
        map: this.map.googleMap,
        animation: google.maps.Animation.BOUNCE,
        icon:{
          url:'../../assets/helmie/destination.png'
        }
      });

      // add the marker to the markers array
      this.markers.push(marker);

      // center and zoom the map to the new marker
      const bounds = new google.maps.LatLngBounds();
      for (const m of this.markers) {
        bounds.extend(m.getPosition() as google.maps.LatLng);
      }
      this.map.fitBounds(bounds);
      console.log(this.markers[0].getPosition()?.lat())
      this.destinationInformations(this.markers)
    }
  }

  //origin informations
  public originInformations(){
    if(!this.markerClicked){
      this.originInformation = true;
      // Center the map to the marker's position
      if (this.center) { // check if the center property is defined and not null
        this.map.panTo(this.center);
        const bounds = new google.maps.LatLngBounds();
      }

      /*Set map not clickable*/
      this.markerClicked = true;
    }
  }

  public destinationInformations(markers: google.maps.Marker[]){
    let marker = markers[0];
    const geocoder = new google.maps.Geocoder();
    const latLng = marker.getPosition();

    if (latLng) {
        geocoder.geocode({location: latLng}, (results, status) => {
            if (status === "OK" && results) {
                if (results[0]) {
                    const streetAddress = results[0].formatted_address;
                    console.log(streetAddress);
                    this.street = streetAddress.split(',')[0];
                } else {
                    console.log("No results found");
                }
            } else {
                console.log("Geocoder failed due to: " + status);
            }
        });
        this.destinationInformation = true;
        this.markerClicked = true;
    } else {
        console.log("Marker position is undefined");
    }
    this.routerOriginDestination(marker.getPosition()?.lat(),marker.getPosition()?.lng())
}

  public closeOriginInformations(){
    this.originInformation = false;
    this.markerClicked = false;
  }

  public closeDestinationInformations(){
    this.destinationInformation = false;
    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];
    this.markerClicked = false;

    // remove route from map


  }

  public back(){
    this.router.navigateByUrl('/homepage');
  }

  faRoute = faRoute
  faClock = faClock
  faArrowsToCircle = faArrowsToCircle
  faLocationArrow = faLocationArrow
  faPlus = faPlus

}

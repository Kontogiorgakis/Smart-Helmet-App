import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faRoute, faClock, faArrowsToCircle, faLocationArrow, faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import { NotificationsService } from '../global/services/tasks/notifications.service';
import { SocketsService } from '../global/services/sockets/sockets.service';
import { ItemsService } from '../global/services/item-shop/item-shop.service';
import { NotificationModel } from '../global/models/notifications/notifications.model';
import { ItemModel } from '../global/models/items/item.model';
declare var ol: any;

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css']
})
export class OpenComponent {
  latitude: number = 35.329175;
  longitude: number = 25.135219;

  map: any;
  circleFeature: any;
  /*HotspotChanger*/
  public hotspotChanger = false;

  /*Chevrons*/
  public chevronUp = false;
  public chevronDown = true;

  /*HTML users*/
  public street:string = ""
  public vectorLay: any
  public hotspotLay:any
  public hotspotRouteLay:any
  public origin = true;

  /*NgIf's*/
  public refocus = false;
  public originInformation = false;
  public destinationOn = false;
  public destinationInformation = false;

  public averageTime:number = 0;
  public averageKilometer:number = 0;
  public averageSpeed:number = 0;

  public destinationLat:string = "";
  public destinationLon:string = "";

  constructor(private router: Router,private routeService: NotificationsService, private locationService: ItemsService, private socketService: SocketsService) { }

  ngOnInit() {
    /*From Search*/
    this.routeService.getAll().subscribe((result) =>{
      for(let res of result){
        if(res.message==="destination" && (res.lat!=="" && res.lon!=="")){
          this.destinationLat = res.lat;
          this.destinationLon = res.lon;
          this,
          console.log("KOMPLE")
          //DisplayMarker and route
            this.destinationMarker(parseFloat(res.lat),parseFloat(res.lon))
            this.handleMarkerClick(true)
            this.displayRoute(this.latitude,this.longitude,parseFloat(res.lat),parseFloat(res.lon),false)
            this.destinationOn = true;
        }else{
          console.log("mat mat lemat")
        }
      }
    })

    /*Put hotspots*/
    this.locationService.getAll().subscribe((result) =>{
      for(let res of result){
        this.hotspotMarker(res);
      }
    })


    //Double click
    // Create a collection of default interactions and remove DoubleClickZoom
    const interactions = ol.interaction.defaults({ doubleClickZoom: false });

    // Create a circle with a 2km radius
    const circle = new ol.geom.Circle(
      ol.proj.fromLonLat([this.longitude, this.latitude]),
      2000 // Radius in meters
    );
    this.circleFeature = new ol.Feature(circle);

    //Style the marker
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: '../../assets/helmie/motoriOrigin.png',
        scale: 0.7,
        className: 'motorOrigin'
      })
    });

    // Create a marker feature at the default position
    const marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([this.longitude, this.latitude])),
      population: 4000,
      rainfall: 500,
    });
    marker.setStyle(iconStyle);

    // Create the vector source with the marker feature
    const vectorSource = new ol.source.Vector({
      features: [marker]
    });

    // Create the vector layer with the marker source
    const vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });

    // Create the map with the tile and vector layers
    this.map = new ol.Map({
      target: 'map',
      zoomControl: false,
      controls: ol.control.defaults({ attribution: false, zoom: false }),
      interactions: interactions,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        vectorLayer, // Add the vector layer to the map
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
        minZoom: 10,
        maxZoom: 19,
      }),
    });

    // Create an interaction to select features
    const selectInteraction = new ol.interaction.Select({
      layers: [vectorLayer],
      condition: ol.events.condition.click
    });

    // Add a listener to the 'select' event of the select interaction
    /*selectInteraction.on('select', (event: any) => {
      if (event.selected.length > 0) {
        console.log('Origin!');
        if(this.origin){
          this.originInformation = true;
        }
        // Remove the select interaction to prevent multiple clicks
      }
    });*/


    // Add the select interaction to the map
    this.map.addInteraction(selectInteraction);

    // Listen to the postrender event of the map to check if the circle is visible
    this.map.on('postrender', this.checkCircleVisibility.bind(this));
    //Listen to the click of origin


    //Create marker

    // Add a single click event listener to the map
    this.map.on('singleclick', (event: any) => {
      if (!this.destinationOn) {
        // Get the clicked coordinate
        const clickedCoordinate = event.coordinate;

        // Convert the coordinate to lon-lat
        const lonLat = ol.proj.toLonLat(clickedCoordinate);
        this.destinationLat = lonLat[1];
        this.destinationLon = lonLat[0];

        // Check if the clicked coordinate is an existing marker
        const clickedFeatures = this.map.getFeaturesAtPixel(event.pixel);
        if (clickedFeatures && clickedFeatures.length > 0) {
          this.locationService.getAll().subscribe((result) =>{
            // Clicked on an existing marker
            console.log('HORRAY'); // Log the message
            /*Show info and route*/
            // Get the latitude and longitude of the clicked marker
            const marker = clickedFeatures[0];
            const markerCoordinates = marker.getGeometry().getCoordinates();
            const markerLonLat = ol.proj.toLonLat(markerCoordinates);


            console.log('Latitude:', markerLonLat[1]);
            console.log('Longitude:', markerLonLat[0]);
            /*Compare lat lon*/

            for(let res of result){
              if((parseFloat(res.lat) === markerLonLat[1])&&(parseFloat(res.lon) === markerLonLat[0])){
                this.street = res.location.charAt(0).toUpperCase() + res.location.slice(1)+ " ("+res.name+")";
                //Change elements
                const imageElement = document.getElementById("image_loc") as HTMLImageElement;
                imageElement.src = "../../assets/helmie/locations/"+res.image;

                this.handleMarkerClick(true);
                this.displayRoute(this.latitude, this.longitude, markerLonLat[1], markerLonLat[0],true);
                this.destinationOn = true;
              }
            }
          })

          this.destinationInformation = true;

        } else {
          // Clicked on a non-marker area

          this.destinationMarker(lonLat[1], lonLat[0]);
          this.handleMarkerClick(false);
          this.displayRoute(this.latitude, this.longitude, lonLat[1], lonLat[0],false);
          this.destinationOn = true;

          // Call the routing service to get the route from origin to marker
        }
      }
    });

  }

  hotspotMarker(location:ItemModel){
    // Create a new marker feature at the clicked coordinate
    const marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(location.lon), parseFloat(location.lat)])),
      population: 4000,
      rainfall: 500,
    });

    // Style the marker as desired
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: '../../assets/helmie/locations/'+location.image,
        scale: 0.7,
        className: 'motorOrigin'
      })
    });
    marker.setStyle(iconStyle);

    // Create a vector source with the marker feature
    const vectorSource = new ol.source.Vector({
      features: [marker]
    });

    // Create a vector layer with the vector source
    this.hotspotLay = new ol.layer.Vector({
      source: vectorSource
    });

    // Add the vector layer to the map
    this.map.addLayer(this.hotspotLay);



  }


  destinationMarker(destinationLatitude:number, destinationLongitude:number){
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${destinationLatitude}&lon=${destinationLongitude}&format=json`)
          .then(response => response.json())
          .then(data => {
            const streetName = data?.address?.road; // Use optional chaining to safely access 'road' property
            const houseNumber = data?.address?.house_number; // House number
            if (streetName) {
              console.log("Street Name: "+streetName+" "+houseNumber);
              if(houseNumber){
                this.street = streetName+" "+houseNumber
              }else{
                this.street = streetName
              }
            } else {
              console.log("Street name not found in API response.");
            }
          })
          .catch(error => console.error(error));

        // Create a new marker feature at the clicked coordinate
        const marker = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([destinationLongitude, destinationLatitude])),
          population: 4000,
          rainfall: 500,
        });

        // Style the marker as desired
        const iconStyle = new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 1],
            src: '../../assets/helmie/destination.png',
            scale: 0.7,
            className: 'motorOrigin'
          })
        });
        marker.setStyle(iconStyle);

        // Create a vector source with the marker feature
        const vectorSource = new ol.source.Vector({
          features: [marker]
        });

        // Create a vector layer with the vector source
        this.vectorLay = new ol.layer.Vector({
          source: vectorSource
        });

        // Add the vector layer to the map
        this.map.addLayer(this.vectorLay);
  }

  displayRoute(originLatitude:number, originLongitude:number, destinationLatitude:number, destinationLongitude:number, hotspot:boolean) {
    // Define the OSRM API endpoint
    const endpoint = `https://router.project-osrm.org/route/v1/driving/${originLongitude},${originLatitude};${destinationLongitude},${destinationLatitude}?overview=full&geometries=geojson&steps=true`;

    // Fetch the route data from the OSRM API
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        // Get the route geometry from the response
        const routeGeometry = data.routes[0].geometry;

        // Get the duration and distance of the route
        const duration = data.routes[0].duration;
        this.averageTime = parseFloat((duration/60).toFixed(1));

        const distance = data.routes[0].distance;
        this.averageKilometer = parseFloat((distance / 1000).toFixed(1));

        // Calculate the average speed in kilometers per hour
        const averageSpeed = distance / (duration / 3600);

        // Extract and print directions to console
        const directions = data.routes[0].legs[0].steps.map((step: any, index: number) => {
          const distance = step.distance;
          const modifier = step.maneuver.modifier;
          const type = step.maneuver.type;

          let instruction = "";
          if (modifier && type) {
            instruction = `${modifier} ${type}`;
          } else if (modifier) {
            instruction = modifier;
          } else if (type) {
            instruction = type;
          }

          console.log(`${index}: In ${distance} meters, ${instruction}`);
        });

        console.log("Directions:");
        console.log(directions);


        // Create a new OpenLayers format for reading GeoJSON data
        const format = new ol.format.GeoJSON();

        // Read the route geometry as a feature
        const feature = format.readFeature(routeGeometry, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        });

        // Set the style for the route feature
        feature.setStyle(
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'purple',
              width: 3,
            }),
          })
        );

        if(hotspot){
          this.hotspotLay.getSource().addFeature(feature);
        }else{
          this.vectorLay.getSource().addFeature(feature);
        }

        // Zoom to the extent of the route feature
        this.map.getView().fit(feature.getGeometry(), {
          padding: [100, 100, 100, 100],
          minResolution: 10,
        });

        if (this.averageKilometer <= 1) {
          this.map.getView().setZoom(17);
        } else if (this.averageKilometer <= 2){
          this.map.getView().setZoom(15);
        }else if (this.averageKilometer <= 3){
          this.map.getView().setZoom(14);
        }else if (this.averageKilometer <= 6){
          this.map.getView().setZoom(13);
        }else{
          this.map.getView().setZoom(10);
        }
      })
      .catch(error => console.log(error));
  }

  handleMarkerClick(hotspot:boolean) {
    this.destinationInformation = true;
    this.origin = false;
    console.log('Destination!');
    if(hotspot){
      this.hotspotChanger = true;
    }
  }

  closeDestinationInformations() {
    this.destinationInformation = false;
    this.destinationOn = false;
    this.origin = true;

    // Remove marker
    if (this.vectorLay) {
      // Clear the vector source to remove all features
      const vectorSource = this.vectorLay.getSource();
      if (vectorSource) {
        vectorSource.clear();
      }

      // Remove the vector layer from the map
      this.map.removeLayer(this.vectorLay);
    }

    if (this.hotspotLay) {
      // Get the hotspot source from the layer
      const hotspotSource = this.hotspotLay.getSource();
      if (hotspotSource) {
        // Get all features from the hotspot source
        const features = hotspotSource.getFeatures();

        // Find the polyline feature based on its geometry type
        const polylineFeature = features.find((feature: { getGeometry: () => { (): any; new(): any; getType: { (): string; new(): any; }; }; }) => feature.getGeometry().getType() === 'LineString');

        if (polylineFeature) {
          // Remove the polyline feature from the hotspot source
          hotspotSource.removeFeature(polylineFeature);
        }
      }
    }
  }



  checkCircleVisibility() {
    // Get the extent of the map view
    const extent = this.map.getView().calculateExtent(this.map.getSize());

    // Check if the circle feature is visible within the extent
    const isVisible = this.circleFeature.getGeometry().intersectsExtent(extent);

    // Print a message if the circle is not visible
    if (!isVisible) {
      console.log('The circle is not visible on the map.');
      this.refocus = true;
    }else{
      this.refocus = false;
    }
  }

  /*Go to homepage*/
  back() {
    this.router.navigateByUrl('/homepage');
  }

  /*Refocus to origin*/
  centerToOrigin(){
    console.log("KALI KARDIA")
    this.refocus = false;
    const view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(15);
  }

  closeOriginInformations(){
    this.originInformation = false;
  }

  /*Save location*/
  saveLocation(){
    const informationsElement = document.getElementById('informations') as HTMLElement;

    if(this.chevronDown){
      informationsElement.style.height = '401px';
      this.chevronDown = false;
      this.chevronUp = true;
    }else{
      informationsElement.style.height = '131px';
      this.chevronDown = true;
      this.chevronUp = false;
    }

    /*Remove outline*/
    for (let i = 0; i < this.arr.length; i++) {
      const element = document.getElementById(this.arr[i]);
      if (element) {
        element.style.outline = "none";
      }
    }

    /*Disable locations*/
    this.locationService.getAll().subscribe((result) =>{
      for(let res of result){
        /*this.locationService.delete(res._id).subscribe(() => {
          //this.getAllTasks();
          this.socketService.publish("tasks_update", {});
        });*/
        for (let i = 0; i < this.arr.length; i++) {
          if (res.location === this.arr[i]) {
            const element = document.getElementById(this.arr[i]);
            if (element) {
              element.style.opacity = "30%";
              element.style.pointerEvents = "none";
            }
          }else{
            this.selected = i;
          }
        }
      }
    })

  }

  public arr = ["homie","work","market","bank","gym","school","workshop","grocery","cinema","hospital"];
  public selected:number = 11

  hotspot(location: string) {
    for (let i = 0; i < this.arr.length; i++) {
      if (location !== this.arr[i]) {
        const element = document.getElementById(this.arr[i]);
        if (element) {
          element.style.outline = "none";
        }
      }else{
        this.selected = i;
      }
    }

    console.log(location);
    const locat = document.getElementById(location) as HTMLElement | null;
    if (locat) {
      locat.style.outline = "3px solid green"; // Set the outline to be 2px solid green
    }
  }
  apply(){
    if(!this.hotspotChanger){
      const selection = this.selected;
      console.log(selection)

      /*Bakalikos tropos for safety reason*/
      let checker=0;
      for (let i = 0; i < this.arr.length; i++) {
        const element = document.getElementById(this.arr[i]);
        if (element) {
          if(element.style.outline!=="none")
            checker++;
        }
      }


      if(checker>0 ){
        var img = "";
        var loc = "";
        if(selection===0){
          img="houseLoc.png"
          loc="homie"
        }else if(selection===1){
          img="workLoc.png"
          loc="work"
        }else if(selection===2){
          img="marketLoc.png"
          loc="market"
        }else if(selection===3){
          img="bankLoc.png"
          loc="bank"
        }else if(selection===4){
          img="gymLoc.png"
          loc="gym"
        }else if(selection===5){
          img="schoolLoc.png"
          loc="school"
        }else if(selection===6){
          img="workshopLoc.png"
          loc="workshop"
        }else if(selection===7){
          img="groceryLoc.png"
          loc="grocery"
        }else if(selection===8){
          img="cinemaLoc.png"
          loc="cinema"
        }else if(selection===9){
          img="hospitalLoc.png"
          loc="hospital"
        }

        /*name of the street*/
        let street = "";
        console.log(this.selected)
        console.log(this.destinationLat);
        console.log(this.destinationLon);
        this.getAddressInfo(this.destinationLat, this.destinationLon)
        .then((address) => {
          console.log("Adesanyaress:", address.addressName);
          console.log("House Number:", address.houseNumber);
          street = address.addressName+" "+address.houseNumber;
          /*Create location*/
          let location = new ItemModel();
          location.lat = this.destinationLat;
          location.lon = this.destinationLon;
          location.image = img;
          location.name = street;
          location.location = loc
          location.isAvailable = false;
          location.selected = false;

          this.locationService.create(location).subscribe(() => {
            this.socketService.publish("tasks_update", location);
          })

          /*Remove outline*/
          for (let i = 0; i < this.arr.length; i++) {
            const element = document.getElementById(this.arr[i]);
            if (element) {
              element.style.outline = "none";
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          street = "NoName"
        });
      }
      this.selected=11;
      this.saveLocation()
      location.reload()
    }
  }

  async getAddressInfo(lat:string, lon:string) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.address) {
        const address = {
          addressName: data.address.name || data.address.road || data.address.city || data.address.town || data.address.village || data.address.hamlet,
          houseNumber: data.address.house_number || ""
        };

        return address;
      } else {
        return { addressName: "Address not found", houseNumber: "" };
      }
    } catch (error) {
      console.log("Error:", error);
      return { addressName: "Error occurred", houseNumber: "" };
    }
  }


  /*Icons*/
  faArrowsToCircle = faArrowsToCircle
  faRoute = faRoute
  faClock = faClock
  faLocationArrow = faLocationArrow
  faChevronDown = faChevronDown
  faChevronUp = faChevronUp
}

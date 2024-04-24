import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../global/services/tasks/tasks.service';
import { SocketsService } from '../global/services/sockets/sockets.service';
import { TaskModel } from '../../app/global/models/tasks/task.model';
import { NotificationsService } from '../global/services/tasks/notifications.service';
import { NotificationModel } from '../global/models/notifications/notifications.model';
import { result } from 'lodash';
import { ItemsService } from '../global/services/item-shop/item-shop.service';
import { ItemModel } from '../global/models/items/item.model';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  /*variables*/
  temperature:number = 0;
  weather:string = "";
  route = new NotificationModel();
  public hotspot: ItemModel[] = []

  /*Hotspots*/
  public image:string =""
  public location:string =""
  public name:string =""

  constructor(private router: Router,private notificationService: NotificationsService, private locationService: ItemsService, private socketService: SocketsService) { }


  ngOnInit(): void {

    /*Delete locations*/
    this.deleteLocations()

    /*Get weather*/
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Irákleion, GR&units=metric&appid=3ee3784983b57d56fbdcef2dcdd506eb`)
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.temperature = data.main.temp;
    });
    //console.log("Tempa = "+this.temperature)

    /*Get Locations*/
    this.locationService.getAll().subscribe((result) =>{
      for(let res of result){
        this.hotspot.push(res)
        /*this.image = res.image
        this.location = res.location
        this.name = res.name*/
      }
    })
  }

  public deleteLocations(){
    this.notificationService.getAll().subscribe((result) => {
      for(let res of result){
        this.notificationService.delete(res._id).subscribe(() => {
          //this.getAllTasks();
          this.socketService.publish("tasks_update", {});
        });
      }
    });
    console.log(result)
  }

  public allLocations: string[] = []; // Array containing all possible locations
  public filteredLocations: string[] = []; // Array to store filtered locations
  public showDropdown: boolean = false;

  public closeTab(){
    console.log("Meme")
    this.showDropdown = false;
  }

  public async fetchLocations(searchQuery: string) {
    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      const encodedRegion = encodeURIComponent("Crete"); // Add the desired region or area
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodedQuery}&countrycodes=gr&format=json&addressdetails=1&limit=10&bounded=1&viewbox=23.9375,34.6694,28.3837,35.7226&extratags=1`);
      const data = await response.json();

      // Extract the address information from the response
      const addresses = data.map((item: any) => `${item.address.road || item.address.pedestrian || item.address.building || item.address.house_number}, ${item.address.city || item.address.town || item.address.village || item.address.hamlet || item.address.county}`);

      this.filteredLocations = addresses;
      this.showDropdown = true;
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  }


  public handleSearchInput() {
    const searchInput = document.getElementById("search") as HTMLInputElement;
    const searchQuery = searchInput.value.toLowerCase().trim();

    console.log(searchQuery)
    if (searchQuery === '') {
      this.filteredLocations = [];
      this.showDropdown = false;
      return;
    }

    this.fetchLocations(searchQuery);
  }

  public selectLocation(location: string) {
    const searchInput = document.getElementById("search") as HTMLInputElement;
    searchInput.value = location;
  }

  public searchLocation() {
    const searchInput = document.getElementById("search") as HTMLInputElement;
    const destination = searchInput.value;

    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(destination)}&format=json&limit=1`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitude = parseFloat(data[0].lat);
          const longitude = parseFloat(data[0].lon);
          console.log(`Latitude: ${latitude}`);
          console.log(`Longitude: ${longitude}`);
          this.updateBackend(latitude.toString(),longitude.toString())
        } else {
          console.log("No location found");
        }
      })
      .catch(error => {
        console.error("Error fetching location:", error);
      });
  }


  public updateBackend(lat:string, lon:string){
    /*create origin*/
    this.route.message = "origin";
    this.route.completed = true;
    this.route.lat = "35.329175";
    this.route.lon = "25.135219"

    this.notificationService.create(this.route).subscribe((result) => {
      this.socketService.publish("tasks_update", this.route);
    })

    /*create destination*/
    this.route.message = "destination";
    this.route.completed = true;
    this.route.lat = lat;
    this.route.lon = lon

    this.notificationService.create(this.route).subscribe((result) => {
      this.socketService.publish("tasks_update", this.route);
    })

    this.router.navigateByUrl('/open')
  }

  public openMaps(){
    this.updateBackend("","");
  }

  options2 = {
    types: ['(cities)']
  }

  //Local Variable defined
  formattedaddress=" ";
  public AddressChange(address: any) {
    //setting address from API to local variable
    this.formattedaddress=address.formatted_address
  }

  faMagnifyingGlass = faMagnifyingGlass;
}

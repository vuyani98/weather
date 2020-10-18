import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { trigger, transition, style, state, stagger, animate, keyframes} from '@angular/animations';
import { __await } from 'tslib';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css'],
  animations: [ trigger( 'cardEntry', [

    transition( 'void => *',
      animate('400ms 500ms ease-in', keyframes([
        style({ opacity : 0, transform : 'translateX(50%)', offset : 0}),
        style({ opacity : 0.3, transform : 'translateX(25%)', offset : 0.5}),
        style({ opacity : 1, transform : 'translateX(0)', offset : 1})
      ])))
  ])]
})

export class CurrentComponent implements OnInit {
  
  //propertiy and class member decalarations
  lat: any;
  long: any;
  error : any;
  weather = {
    city : null,
    country : null,
    temp : null,
    description : null,
    icon : null, 
    humidity : null 
  };

  city: any;
  isSearching: boolean;

  constructor(private forecast: ForecastService, private app : AppComponent){}
 
  ngOnInit(): void {

    var self = this;
    self.isSearching = false;

    //getting location
    self.app.getLocation();
    self.forecast.location.subscribe(data => {
      self.lat = data.lat;
      self.long = data.long;
    });

    
    setTimeout(() => { this.forecast.getWeather(self.lat, self.long).subscribe(response =>
      {
        this.weather.city = response.name;
        this.weather.country = response.sys.country;
        this.weather.description = response.weather[0].description;
        this.weather.icon = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
        this.weather.temp = Math.floor(response.main.temp - 273);
        this.weather.humidity = response.main.humidity;
      }
    )}, 500);
  }

  //Getting weather by city searched
  getByCity(){

    //if the search is not empty
    if (this.city){

      this.isSearching = true;
      this.forecast.getCityWeather(this.city).subscribe(response => {
  
          this.weather.city = response.name;
          this.weather.country = response.sys.country;
          this.weather.description = response.weather[0].description;
          this.weather.icon = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
          this.weather.temp = Math.floor(response.main.temp - 273);
          this.weather.humidity = response.main.humidity;
      });
    }

    else{
      this.isSearching = false;
      console.log("missing data");
    }
  }
  
}

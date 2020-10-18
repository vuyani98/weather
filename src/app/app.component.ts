import { Component, OnInit } from '@angular/core';
import {ForecastService} from './forecast.service' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'weather';
  lat: any;
  long: any;

  constructor(private forecast: ForecastService){}

  //function gets user location
  getLocation(){

    var self =this;

    //Checking if browser has location on
    if (navigator.geolocation){

      navigator.geolocation.getCurrentPosition(position => {

        self.lat = position.coords.latitude;
        self.long = position.coords.longitude;
        let data = {
          lat : position.coords.latitude,
          long : position.coords.longitude
        };

        this.forecast.setLocation(data);
      }, error  => {
        alert(error);
      })
    }
    else{
      alert('Location is off');
    }
  }

  //Converts UTC date and getting time
  getTime(dt){

    let newDate = new Date(dt * 1000);
    let hour = newDate.getHours() +':00';
    return hour;
  }

  //function gets icn
  getIcon(icon){

    let src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    return src;
  }

  //Converting Fahrenhiet to degrees celcius
  getTemp(temp){

    return Math.floor(temp - 273);
  }

  //Gets standard date from UTC date
  gettDate(date){

    let newDate = new Date (date * 1000);

    let day = newDate.getDate().toString();

    let month = newDate.getMonth();

    let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    for (let i = 0; i < months.length; i++){

      if (month == i){

        let stringDate = day +' '+ months[i];

        return stringDate;
      }
    }
  }
}

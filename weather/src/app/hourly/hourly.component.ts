import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ForecastService } from '../forecast.service';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {

  public lat;
  public long;
  hourlyArray = [];

  constructor(private forecast: ForecastService, private app: AppComponent) { }

  ngOnInit(): void {
    var self = this;
    self.app.getLocation();
    self.forecast.location.subscribe(data => {
        self.lat = data.lat;
        self.long = data.long;
    });

    setTimeout(()=>self.forecast.getHourly(self.lat, self.long).subscribe(response => {
      self.hourlyArray = response.hourly;
    }), 500)
  }
}

import { Component, OnInit } from '@angular/core';
import { ForecastService} from '../forecast.service';
import { AppComponent } from '../app.component'
import { stagAnimation } from '../stagAnimation';
import { trigger, transition, style, state, stagger, animate, keyframes, animation, query} from '@angular/animations';
import {from, Subject} from 'rxjs';
import { Idaily } from './daily';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css'],
  animations: [

    trigger('stagCard', [
      transition('* => *', [

        query(':enter', style({opacity: 0}), {optional:true}),
        
        query(':enter',  stagger('300ms', [
          animate( '300ms 1s ease-in', keyframes([
              style({ opacity : 0, transform : 'translateX(50%)', offset : 0}),
              style({ opacity : 0.3, transform : 'translateX(25%)', offset : 0.5}),
              style({ opacity : 1, transform : 'translateX(0)', offset : 1})
          ]))
      ]), {optional : true})
      ])

  ])
  ]
})
export class WeeklyComponent implements OnInit {

  public lat;
  public long;
  dailyArray = [];

  constructor(private forecast: ForecastService, private app : AppComponent) {} 

  ngOnInit(): void {

    var self = this;

    //gets location from app component
    self.app.getLocation();
    self.forecast.location.subscribe(data => {
        self.lat = data.lat;
        self.long = data.long;
    });

    //waits for the location then gets weather
    setTimeout(()=>self.forecast.getWeekly(self.lat, self.long).subscribe(response => {
      self.dailyArray = response.daily;
      console.log(self.dailyArray);
    }), 500)
  }
}

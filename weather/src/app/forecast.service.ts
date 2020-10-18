import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Iweather } from './current/weather';
import { Idaily } from './weekly/daily';
import {Subject ,Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators'
import {Ihourly} from './hourly/hourly';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ForecastService{

  //property declarations
  key = "0005e60f1e2ba8182a41099c64d6a239";
  url: string;
  public location = new Subject<any>();

  constructor( private http: HttpClient){}

  //function sets location
  setLocation(data){

    var self = this;
    self.location.next(data) ;
  }
  //function gets current weather
  getWeather(lat, long): Observable<Iweather>{

    return this.https.get<Iweather>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.key}`).pipe( retry(2),
      catchError(this.handleError));
  }

  //function gets weekly weather data
  getWeekly(lat, long): Observable<Idaily>{

    return this.https.get<Idaily>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly&appid=${this.key}`).pipe( retry(2),
    catchError(this.handleError));;
   }
   
   //function gets weather data by city searched
   getCityWeather(city): Observable<Iweather>{

    return this.http.get<Iweather>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}`).pipe( retry(2),
    catchError(this.handleError));
   }

   //function gets Hourly weather data
   getHourly(lat, long): Observable<Ihourly>{

    return this.http.get<Ihourly>(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=daily,minutely&appid=${this.key}`).pipe( retry(2),
    catchError(this.handleError));;
   }
   
   //Function handles errors
   private handleError(error){
     
    //handling not found error
    if(error.status == 404){

      window.alert('City not found')
      return throwError(error.message || 'not found');
    }

    //handling bad requests
    else if(error.status == 400){

      window.alert('Make sure location is on and then reload')
      return throwError(error.message || 'Bad request');
    }
   }
}

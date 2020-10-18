import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForecastService } from './forecast.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentComponent } from './current/current.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { HourlyComponent } from './hourly/hourly.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentComponent,
    WeeklyComponent,
    HourlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ ForecastService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

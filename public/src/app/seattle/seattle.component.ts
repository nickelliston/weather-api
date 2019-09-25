import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {
  temp: any;
  maxTemp: any;
  minTemp: any;
  humidity: any;
  wind: any;
  constructor(private router: Router,
              private weatherService: WeatherService) { }
  ngOnInit() {
    this.getWeather('Seattle');
}

 getWeather(city) {
   const observable = this.weatherService.getWeatherService(city);
   observable.subscribe(data => {
     console.log('API WEATHER:', data);
     this.humidity = data['main']['humidity'];
     this.temp = data['main']['temp'];
     this.maxTemp = data['main']['temp_min'];
     this.minTemp = data['main']['temp_max'];
     this.wind = data['wind']['speed'];

   });
 }
 goHome() {
   this.router.navigate(['/']);
 }
}


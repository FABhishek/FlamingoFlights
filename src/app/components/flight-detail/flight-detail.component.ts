import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline.services';
import { BookFlightService } from 'src/app/services/book-flight.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.scss']
})
export class FlightDetailComponent implements OnInit {

  searchedFlights: Airline[] = [];

  constructor(private airlineService: AirlineService, private bookThisFlight: BookFlightService, private router: Router) { }

  ngOnInit(): void {
    try {
      this.airlineService.getSharedData().subscribe((result) => {
        this.searchedFlights = result;
      });
    } catch (error) {
      console.error('Error fetching searched flights:', error);
    }
  }

  calculateTimeDifference(startTime: any, endTime: any) {
    try {
      startTime = startTime.replace('T', ' ');
      endTime = endTime.replace('T', ' ');

      const date1 = new Date(startTime);
      const date2 = new Date(endTime);

      if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        throw new Error("Invalid date format");
      }

      // Calculate the time difference in milliseconds
      const timeDifference = date2.getTime() - date1.getTime();
      // Calculate hours and minutes
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}hr : ${minutes}min`;
    } catch (error) {
      console.error('Error calculating time difference:', error);
      return "";
    }
  }

  extractDayAndMonth(dateString: string): string {
    try {
      dateString = dateString.replace('T', ' ');
      const dateObj = new Date(dateString);

      if (isNaN(dateObj.getTime())) {
        throw new Error("Invalid date format");
      }

      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const weekday = weekdays[dateObj.getDay()].slice(0, 3);
      const day = dateObj.getDate();
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      const month = monthNames[dateObj.getMonth()];
      return `${weekday}, ${day} ${month}`;
    } catch (error) {
      console.error('Error extracting day and month:', error);
      return "";
    }
  }

  bookFlightById(flightToBook: Airline) {
    try {
      console.log(flightToBook);
      this.bookThisFlight.setFlightData(flightToBook);
      this.router.navigate(["/details"]);
    } catch (error) {
      console.error('Error booking flight:', error);
    }
  }
}

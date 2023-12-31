import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightDataValuesService {

  constructor() { }

    calculateTimeDifference(startTime: any, endTime: any) {
    startTime = startTime.replace('T', ' ');
    endTime = endTime.replace('T', ' ');

    const date1 = new Date(startTime);
    const date2 = new Date(endTime);
    // Calculate the time difference in milliseconds
    const timeDifference = date2.getTime() - date1.getTime();
    // Calculate hours and minutes
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}hr : ${minutes}min`;
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
      return `${weekday}, ${day} ${month}`
    } catch (error) {
      // Handle invalid date format
      return "";
    }
  }
}

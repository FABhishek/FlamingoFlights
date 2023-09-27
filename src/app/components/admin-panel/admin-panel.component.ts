import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airline } from 'src/app/models/airline';
import { AirlineService } from 'src/app/services/airline-services';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  airlines: Airline[] = [];

  flightAddForm!: FormGroup;
  submitted: boolean = false;


  constructor(private airlineService: AirlineService, private fb: FormBuilder) { }

  deleteRow(id: number) {
    try {
      for (let i = 0; i < this.airlines.length; i++) {
        if (this.airlines[i].flightId == id) {
          this.airlines.splice(i, 1);
        }
      }
    }
    catch (error) {
      console.error('Error Deleting Row:', error);
    }

  }

  totalPrice: number = 0

  quantityChanged(item: any) {
    try {
      this.airlines.forEach((p) => {
        if (p.flightId === item.id) {
          p.totalNumberOfSeats = item.quantity;
          return
        }
      });
    } catch (error) {
      console.error('Error in assigning number of passengers', error);
    }

  }
  onSubmit() {
    this.submitted = true;
    console.log(this.flightAddForm.value);
  }

  ngOnInit(): void {
    try {
      this.flightAddForm = this.fb.group({
        origin: [null, [Validators.required, Validators.minLength(3)]],
        destination: [null, [Validators.required, Validators.minLength(3)]],
        timeOfDeparture: [null, [Validators.required]],
        timeOfArrival: [null, [Validators.required]],
        kmsTravel: [0],
      },
        {
          validators: []

        },
      );
    } catch (error) {
      console.error('Error in the flightAddForm:', error);
    }

    console.log("OnInit called");
    //this.productService = new ProductService(); //not needed as we don't wanna create objects here
    this.airlineService.getAllAirlines().subscribe(value => {
      this.airlines = value;
    },
      error => {
        console.log("error occured while fetching data")
      },
      () => { console.log("Product Completed Reading") });
  }

  get f(): { [controlName: string]: AbstractControl } { //getter 
    return this.flightAddForm.controls;
  }
}

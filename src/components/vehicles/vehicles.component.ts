import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehicleComponent implements OnInit {
  private submitted: boolean = false;
  noVehiclesSelected: boolean = true;
  errors: any = [];
  maxVehiclesSelected: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  submit() {
    this.submitted = true;
  }
}

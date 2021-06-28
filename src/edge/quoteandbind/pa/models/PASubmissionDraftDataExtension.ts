import {Submission} from "../../common/models/Submission";
import {Driver} from "./Driver";
import {Person} from "../../common/models/Person";
import * as _ from "underscore";
import {Vehicle} from "./Vehicle";


export class PASubmissionDraftDataExtension {
  drivers:any =  [];
  vehicles:any = [];
  next_id: number = 1;
  private preQualQuestionSets: any[];
  private discoveredDrivers: any[];
  private additionalHousehold: any[];

  constructor(submission: Submission) {
    this.next_id = submission.nextId();

    let data = submission.lobData.personalAuto.coverables;

    if (data && _.isObject(data)) {

      this.drivers = _.map(data.drivers, function (d) {
        let driver = new Driver(d);
        driver.person = submission.findPerson(submission, d.person);
        return driver;
      }, this);

      this.vehicles = _.map(data.vehicles, function (v) {
        return new Vehicle(v);
      }, this);

      this.preQualQuestionSets = data.preQualQuestionSets;
      this.discoveredDrivers = data.discoveredDrivers;
      this.additionalHousehold = data.additionalHousehold;

    } else {
      this.drivers = [];
      this.vehicles = [];
      this.preQualQuestionSets = [];
      this.discoveredDrivers = [];
      this.additionalHousehold = [];
    }
  }

  private nextId() {
    return this.next_id++;
  }
  public createDriver(person: Person) {
    let driver = new Driver(person);
    // extend
    if (person && person.primaryAddress) {
      driver.licenseState = person.primaryAddress.state;
    }
    driver.tempID = this.nextId();

    this.drivers.push(driver);
    return driver;
  };

  public removeDriver(driver: Driver) {
    let idx = _.indexOf(this.drivers, driver);
    if (idx >= 0) {
      this.drivers.splice(idx, 1);
    }
  };

  public createVehicle() {
    let v = new Vehicle({tempID: this.nextId()});
    this.vehicles.push(v);
    return v;
  };

  public removeVehicle(vehicle:Vehicle) {
    let idx = _.indexOf(this.vehicles, vehicle);
    if (idx >= 0) {
      this.vehicles.splice(idx, 1);
    }
  };

  public getDriverForPerson(person: Person) {
    let driver =  _.findWhere(
      this.drivers, {person: person}
    );

    if(driver.dateOfBirth !== person.dateOfBirth){
      driver.dateOfBirth = person.dateOfBirth;
    }

    return driver;
  };
}

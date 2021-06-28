import {Person} from "../../common/models/Person";
import * as _ from "underscore";


export class Driver {
  licenseState: string = "";
  tempID: number = 0;
  person: Person;

  constructor(person: Person) {
    this.person = person;
  }
  public getDisplayName(defaultName:string) {
    return this.person.getDisplayName(defaultName);//, $filter);
  };

  public getDriverStatesForCountry(states: any, countryCode:string) {
    return _.filter(states, function (state) {
      let countryConstraint = _.find(state.categories, function (constraint) {
        return _.keys(constraint).indexOf('Country') !== -1;
      });
      if (countryConstraint) {
        return countryConstraint.Country === countryCode;
      } else {
        return false;
      }
    });
  };
}

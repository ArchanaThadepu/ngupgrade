import * as _ from "underscore";

export class Vehicle {
  private make: string = "";
  private model: string = "";
  private year: string = "";
  private license: string = "";
  private licenseState: string = "";

  constructor(data:any) {
    if (data) {
      _.extend(this, data);
    }
  }

  public getDisplayName(defaultName: string) {
    let name = this.make || '';
    if (this.model) {
      if (name) {
        name += ' ';
      }
      name += this.model;
    }
    if (this.year) {
      if (name) {
        name += ' ';
      }
      name += this.year;
    }
    if (name.length < 1) {
      name = "Unnamed";//$filter('translate')('quoteandbind.controllers.Unnamed');
    } else {
      if (this.license) {
        name += ' (';
        name += this.license;
        if (this.licenseState) {
          name += '/';
          name += this.licenseState;
        }
        name += ')';
      }
    }
    return name;
  };

  public getVehicleStatesForCountry(states:any, countryCode:string) {
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

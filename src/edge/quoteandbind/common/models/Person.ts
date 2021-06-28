import * as _ from 'underscore';
import {LocaleConfig} from "../../../../i18n/LocaleConfig";

export class Person {
  publicID: string = "";
  primaryAddress: any;
  dateOfBirth: any;
  prefix: string = "";
  suffix: string = "";
  particle: string = "";
  lastNameKanji: string = "";
  firstNameKanji: string = "";
  lastName: string = "";
  firstName: string = "";
  nameConfig: any;

  constructor(data: any) {
    if (data) {
      _.extend(this, data);
      if (!data.firstName) {
        data.firstName = '';
      }
      if (!data.lastName) {
        data.lastName = '';
      }
    }
    this.nameConfig = LocaleConfig.getLocalConfig().name;
  }

  public getDisplayName(defaultName: string) {
    return this._format(this, ' ') || defaultName;
  };

  public _append(sb: any[], fieldId: string, value: string) {
    if (!_.isEmpty(value) && _.contains(this.nameConfig.visibleFields, fieldId)) {
      sb.push(value);
    }
  }

  private _format(person: Person, delimiter: string): any {
    let lastName = person.lastNameKanji || person.lastName;
    let firstName = person.firstNameKanji || person.firstName;
    let result:any = [];
    switch (this.nameConfig.formatMode) {
      case 'default':
        this._append(result, 'Prefix', person.prefix);
        this._append(result, 'FirstName', firstName);
        this._append(result, 'LastName', person.particle);
        this._append(result, 'LastName', lastName);
        this._append(result, 'LastName', person.suffix);

        break;
      case 'France':
        this._append(result, 'Prefix', person.prefix);
        this._append(result, 'LastName', person.particle);
        this._append(result, 'LastName', lastName);
        this._append(result, 'LastName', person.suffix);
        this._append(result, 'FirstName', firstName);
        break;

      case 'Japan':
        this._append(result, 'LastName', lastName);
        this._append(result, 'FirstName', firstName);
        break;
    }
    return result.join(delimiter);
  }

}

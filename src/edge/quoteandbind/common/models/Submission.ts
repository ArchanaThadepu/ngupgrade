import * as _ from 'underscore';
import {Person} from "./Person";
import {PolicyLineExtensionConfiguration} from "../../../../integration/quoteandbind/PolicyLineExtensionConfiguration";

export class Submission {
  next_id: number = 1;
  persons: any = [];
  baseData: any;
  quoteID: string = "";
  lobData: any;
  agency: { agencyCode: any; } | undefined;
  currentView: string | undefined;

  constructor(data: any) {
    // PROCESS
    if (data) {
      data.persons = [];
      data.baseData.accountHolder = this._forcePerson(data, data.baseData.accountHolder);
      if (data.baseData.accountHolder) {
        data.baseData.accountHolder.accountHolder = true;
      }
      _.extend(this, data);
    } else {
      let dateObj = new Date();
      this.baseData = {
        account: {
          accountHolder: {
            tempID: this.next_id++,
            accountHolder: true
          },
          policyAddress: {
            postalCode: ''
          }
        },
        periodStartDate: {
          year: dateObj.getFullYear(),
          month: dateObj.getMonth() + 1,
          day: dateObj.getMonth()
        },
        productCode: 'PersonalAuto', //GW: FIXME: For now.
        lobs: {}
      };
      this.persons = [];
    }
    this.baseData.questionSetNames = [];
    PolicyLineExtensionConfiguration.mixinLobDraftDataExtensions(this);
  }

  public createId() {
    return this.next_id++;
  };

  public nextId() {
    return this.next_id++;
  };

  public createPerson(options: any) {
    let person = new Person({
      tempID: this.next_id++
    });
    this.persons.push(person);
    return person;
  };


  public getAccountHolderPerson() {
    return this.baseData.accountHolder;
  };

  public submissionExists() {
    return !!(this.quoteID);
  };

  public findPerson(submission: Submission, person: Person) {
    if (_.isEmpty(person)) {
      return null;
    }

    return this._forcePerson(submission, person);
  };

  private _forcePerson(submission: Submission, person: Person) {
    let p = person.publicID ? _.findWhere(submission.persons, {publicID: person.publicID}) : null;
    if (!p) {
      p = new Person(person);
      p.tempID = this.next_id++;
      submission.persons.push(p);
    }
    return p;
  };
}

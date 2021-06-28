import {Injectable} from '@angular/core';

export class NameValueService {
  private nameValues: any = {};

  constructor() {
  }

  public getValue(key: any): any {
    //return error : need to handle promise
    return this.nameValues[key];
  }

  public setValues(key: string, options: any) {
    this.nameValues[key] = options;
  }

  public addValues(values: any) {
    this.nameValues = values;
  }

  public getValues() {
    return this.nameValues;
  }
}

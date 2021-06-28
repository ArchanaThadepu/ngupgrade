import {Injectable, Inject} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageInfo {
  //public variables
  //private variables
  protected messageCode: string = "";
  protected message: string = "";
  protected severity: string = "";


  //ctor
  constructor() {
  }

  //functions
  public setMessageCode(messageCode: string) {
    this.messageCode = messageCode;
  }

  public getMessageCode() {
    return this.messageCode;
  }

  public setMessage(message: any) {
    this.message = message;
  }

  public getMessage(): string {
    return this.message;
  }

  public setSeverity(severity: string) {
    this.severity = severity;
  }

  public getSeverity(): string {
    return this.severity;
  }

}




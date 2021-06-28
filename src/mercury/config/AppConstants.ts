import {Injectable} from '@angular/core';
import * as envData from "./EnvConfig.json"
import * as tgs from "./ServiceEndPoint.json"
import * as fp from "./FieldProperties.json"
import * as pp from "./PageProperties.json"
import * as fsp from "./FlowService.json"
import * as ht from "./HelpTemplate.json"

@Injectable({
  providedIn: 'root',
})
export class AppConstants {

  public TransportGatewaySettings: any;
  public EnvConfig: any;
  public FieldProperties: any;
  public PageProperties: any = {};
  public FlowServiceProperties: any;
  public HelpTemplate: any;

  constructor() {
    this.TransportGatewaySettings = tgs;
    this.EnvConfig = envData;
    this.FieldProperties = fp
    this.PageProperties = pp;
    this.FlowServiceProperties = fsp;
    this.HelpTemplate = ht;
  }
}

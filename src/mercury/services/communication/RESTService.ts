import {Injectable} from "@angular/core";
import {AppConstants} from "../../config/AppConstants";
import * as _ from "underscore";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable()
export class RESTService {

  private requestId = 0;

  constructor(private appConstants: AppConstants,
              private httpClient: HttpClient) {
  }

  public getLocal(location:string):Promise<Object> {
    console.log(" getLocal:location == "+ location);
    return this.httpClient.get(location).toPromise();
  }

  public send(method: string, params: any): Promise<Object> {
    let setting = this.appConstants.TransportGatewaySettings[method];
    // if setting is null, need to throw error
    let callStart = new Date().getTime();
    let config = setting.httpMethod === 'GET' ? this.createGetConfig(params, setting)
      : this.createPostConfig(params, setting, method);
//								config.headers = TransportGatewaySettings.gatewayHeaders;
    config.timeout = this.appConstants.TransportGatewaySettings.serviceTimeout;
    if (setting.httpMethod === 'GET') {
      return this.httpClient.get(config.url, config).toPromise();
      // return this.httpClient.get(config.url,  config).pipe(
      //   tap(
      //     data =>
      //   )
      // );
    } else {
      return this.httpClient.post(config.url, config).toPromise();
    }
  }

  protected createPostConfig(params: any, setting: any, methodName: string) {
    if (params) {
      this.requestId++;
      params.id = this.requestId;
    }
    let data = {
      'header': {
        'relatedTransactionId': this.appConstants.TransportGatewaySettings.gatewayHeaders.relatedTransactionId,
        'systemTokenId': this.appConstants.TransportGatewaySettings.gatewayHeaders.systemTokenId
      },
      'body': params
    }
    let config = {
      method: 'POST',
      url: setting.baseURL + setting.serviceEndPoint,
      timeout: 0,
      data: data,
      withCredentials: true,
      headers: _.clone(this.appConstants.TransportGatewaySettings.gatewayHeaders)
    }
    return config;
  }

  protected createGetConfig(params: any, setting: any) {
    let localParams = (params.indexOf("zipCode") >= 0) ? params + "&" : params;
    let config = {
      method: 'GET',
      url: setting.baseURL + setting.serviceEndPoint + localParams,
      withCredentials: true,
      timeout: 0,
      headers: _.clone(this.appConstants.TransportGatewaySettings.gatewayHeaders)
    }
    return config;
  }
}


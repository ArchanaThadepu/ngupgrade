import {RESTService} from "./communication/RESTService";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private restService: RESTService) {

  }
  protected processRequest(methodName: string, param: any) {
    return this.restService.send(methodName, param);
  }

  public getToken() {
    return this.processRequest('getToken', '')
  }
}

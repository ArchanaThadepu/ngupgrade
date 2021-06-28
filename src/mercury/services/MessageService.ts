import {Injectable} from "@angular/core";
import {NameValueService} from "./base/NameValueService";

@Injectable({
  providedIn: 'root',
})
export class MessageService extends NameValueService {
  constructor() {
    super();
  }

  public getMessage(key:string){
    return super.getValue(key);
  }
}

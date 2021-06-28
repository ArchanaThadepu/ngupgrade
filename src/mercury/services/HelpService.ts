import {Injectable} from "@angular/core";
import {NameValueService} from "./base/NameValueService";

@Injectable({
  providedIn: 'root',
})
export class HelpService extends NameValueService {
  constructor() {
    super();
  }

  private getHelp(key:string){
    return super.getValue(key);
  }
}

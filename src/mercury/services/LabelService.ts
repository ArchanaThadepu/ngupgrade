import {Injectable} from "@angular/core";
import {NameValueService} from "./base/NameValueService";

@Injectable({
  providedIn: 'root',
})
export class LabelService extends NameValueService {
  constructor() {
    super();
  }

  public getLabel(key:string){
    return super.getValue(key);
  }
}

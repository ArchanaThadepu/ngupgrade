import {Injectable} from "@angular/core";
import {NameValueService} from "./base/NameValueService";

@Injectable({
  providedIn: 'root',
})
export class ConstraintValuesService extends NameValueService {
  constructor() {
    super();
  }

  private getConstraintValues(key:string){
    return super.getValue(key);
  }
}

import {Injectable} from "@angular/core";
import {NameValueService} from "./base/NameValueService";

@Injectable({
  providedIn: 'root',
})
export class ValidValueService extends NameValueService {
  constructor() {
    super();
  }

  public getFilteredTypeListByFilter(key: string) {
    return super.getValue(key);
  }
}

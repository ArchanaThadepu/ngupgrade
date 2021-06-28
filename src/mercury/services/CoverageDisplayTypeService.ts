import {Injectable} from "@angular/core";
import {NameValueService} from "./base/NameValueService";

@Injectable({
  providedIn: 'root',
})
export class CoverageDisplayTypeService extends NameValueService {
  constructor() {
    super();
  }

  private getCoverageDisplayType(key:string){
    return super.getValue(key);
  }
}

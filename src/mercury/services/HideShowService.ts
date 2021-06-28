import {Injectable} from "@angular/core";
import {NameValueService} from "./base/NameValueService";

@Injectable({
  providedIn: 'root',
})
export class HideShowService extends NameValueService {
  constructor() {
    super();
  }

  public getHideShow(key:string){
    return super.getValue(key);
  }
}

import {Injectable} from '@angular/core';
import * as envData from "./locale.json"

@Injectable({
  providedIn: 'root',
})
export class LocaleConfig {

  private static Locale: any;

  constructor() {
    LocaleConfig.Locale = envData;
  }

  public static getLocalConfig(): any {
    return LocaleConfig.Locale;
  }
}

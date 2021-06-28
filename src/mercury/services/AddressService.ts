import {RESTService} from "./communication/RESTService";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private restService: RESTService) {
  }

  protected processRequest(methodName: string, param: any) {
    return this.restService.send(methodName, param).then(
      () => console.log('AddressService.processRequest *success*'),
      () => console.log('AddressService.processRequest *error*'),
    );
  }

  public getZipDetail(zipCode: string) {
    // TODO - change this later
    // if (zipCode === undefined || !zipCode) {
    //   var deferred = $q.defer();
    //   deferred.resolve({});
    //   return deferred.promise;
    // }
    return this.processRequest('zipDetailsByZip', 'zipCode=' + zipCode);
  }

  public standardizeAddress(address1: string, address2: string, city: string, state: string, zip: string) {
    let request: any = {};
    request.address1 = address1;
    request.address2 = address2 ? ("Apt " + address2) : address2;
    request.city = city;
    request.state = state;
    request.zip = zip;

    return this.processRequest('standardizeAddress', request);
  }

  /**
   * Takes a submission object and changes the value of the path:
   * submissionObj.draftData.policyAddress.addressLine2 if it contains
   * a #. # is replaced with Apt
   */
  public formatAddressLine2(policyAddress: any) {
    if (policyAddress && policyAddress.addressLine2 && policyAddress.addressLine2.indexOf("#") >= 0) {
      policyAddress.addressLine2 = policyAddress.addressLine2.replace("#", "Apt");
    }
  }
}

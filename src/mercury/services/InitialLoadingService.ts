import {Injectable, Inject, Component} from '@angular/core';

import {AppConstants} from '../config/AppConstants';
import {ValidValueService} from "./ValidValueService";
import {MessageService} from "./MessageService";
import {LabelService} from "./LabelService";
import {HelpService} from "./HelpService";
import {HideShowService} from "./HideShowService";
import {ConstraintValuesService} from "./ConstraintValuesService";
import {CoverageDisplayTypeService} from "./CoverageDisplayTypeService";
import {RESTService} from "./communication/RESTService";
import {TokenService} from "./TokenService";
import {AddressService} from "./AddressService";
import {Submission} from "../../edge/quoteandbind/common/models/Submission";
import {readFileSync} from "fs";
import {NameValueService} from "./base/NameValueService";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class InitialLoadingService {

  private submissionObj: any;
  private errorLoadingPageInfo: boolean = false;

  constructor(private validValueService: ValidValueService,
              private messageService: MessageService,
              private labelService: LabelService,
              private helpService: HelpService,
              private hideShowService: HideShowService,
              private constraintsValuesService: ConstraintValuesService,
              private coverageDisplayTypeService: CoverageDisplayTypeService,
              private restService: RESTService,
              private tokenService: TokenService,
              private appConstants: AppConstants,
              private addressService: AddressService) {
  }

  initializeContext(type: any, state: any, zipCode: any, effectiveDate: any, quoteID: any,
                    dateOfBirth: any, agentCode: any, initiatedBy: any, email: any, lastName: any,
                    channel: any, promoCode: any, referralCode: any, lgsrc: any, lgsubsrc: any,
                    adID: any, campaignName: any, creativeName: any, campaignSource: any,
                    campaignTactic: any, campaignType: any, cID: any, token: any, dfcToken: any,
                    deviceType: any, partnerClickID: any): any {

    // let tokenPromise = this.tokenService.getToken();
    // tokenPromise.then( (resp: any) => {
    //     let tokenAPIGW = resp.response.token;
    //     this.appConstants.TransportGatewaySettings.gatewayHeaders.systemTokenId = tokenAPIGW;
    //
    //     let quotePromise = this.setupQuote(type, state, zipCode, effectiveDate, quoteID, dateOfBirth, agentCode,
    //       initiatedBy, email, lastName, channel, promoCode, referralCode, lgsrc, lgsubsrc, adID, campaignName,
    //       creativeName, campaignSource, campaignTactic, campaignType, cID, token, dfcToken, deviceType, partnerClickID);
        // quotePromise.then(function (resp) {
        //     deferred.resolve(resp);
        //   },
        //   function (error) {
        //     deferred.reject(error);
        //   })
    //   },
    //   function (err) {
    //     deferred.reject(err);
    //   });
    // return deferred.promise;
  }

  getSubmission(): any {
    return this.submissionObj;
  }

  isErrorLoadingPageInfo(): boolean {
    return this.errorLoadingPageInfo;
  }

  public createDraftData(product: any, date: any, zipInfo: any) {
    let dt = new Date(date);
    return {
      baseData: {
        accountHolder: {
          firstName: '',
          lastName: '',
          dateOfBirth: null,
          emailAddress1: '',
          primaryPhoneType: null,
          addressLine1: null,
          subtype: 'Person'
        },
        policyAddress: zipInfo,
        periodStartDate: {
          year: dt.getFullYear(),
          month: dt.getMonth() + 1,
          day: dt.getDate()
        },
        productCode: product
      }
    };
  }

  public getZipInfo(zipInfos: any, state: any) {
    if (!zipInfos || zipInfos.length < 1) {
      return {
        state: state,
        country: 'US',
        type: 'home'
      };
    }
    let zipInfo = zipInfos[0];
    return {
      city: zipInfo.city,
      state: zipInfo.state,
      postalCode: zipInfo.zip,
      country: 'US',
      type: 'home',
      addressLine1: null,
      houseNumber: null,
      streetName: null
    }
  }

  updateData(PageProperties: any, state: any, rateLevel: any) {
    this.loadData(PageProperties, state, rateLevel);
  }

  public getLocationURL(baseRateLevel: any, rateLevel: any, pageProperty: any) {
    if (rateLevel && pageProperty) {
      if (baseRateLevel == rateLevel) {
        return pageProperty.baseLocationURL;
      }
      return pageProperty.alternativeLocationURL;
    }
    return pageProperty.alternativeLocationURL;
  }

  public loadValues(baseKey: string, location: string, service: NameValueService) {
      this.restService.getLocal("./mercury/config/"+location).then(
        (resp: any) => service.addValues(resp),
        (error: HttpErrorResponse) => console.log("loadValues *failure*"+JSON.stringify(error))
      );
  }

  private loadData(PageProperties: any, state: any, rateLevel: any) {
    let rateLevels = PageProperties.rateLevels;
    let baseRateLevel = rateLevels[state].baseRateLevel;

    let valueKey = PageProperties.validValues[state];
    let locationURL = this.getLocationURL(baseRateLevel, rateLevel, valueKey);
    this.loadValues(valueKey.baseServiceURL, locationURL, this.validValueService);

    valueKey = PageProperties.labels[state];
    locationURL = this.getLocationURL(baseRateLevel, rateLevel, valueKey);
    this.loadValues(valueKey.baseServiceURL, locationURL, this.labelService);

    valueKey = PageProperties.helps[state];
    locationURL = this.getLocationURL(baseRateLevel, rateLevel, valueKey);
    this.loadValues(valueKey.baseServiceURL, locationURL, this.helpService);

    valueKey = PageProperties.messages[state];
    locationURL = this.getLocationURL(baseRateLevel, rateLevel, valueKey);
    this.loadValues(valueKey.baseServiceURL, locationURL, this.messageService);

    valueKey = PageProperties.hideShowRules[state];
    locationURL = this.getLocationURL(baseRateLevel, rateLevel, valueKey);
    this.loadValues(valueKey.baseServiceURL, locationURL, this.hideShowService);

    valueKey = PageProperties.constraintValues[state];
    locationURL = this.getLocationURL(baseRateLevel, rateLevel, valueKey);
    this.loadValues(valueKey.baseServiceURL, locationURL, this.constraintsValuesService);

    valueKey = PageProperties.coverageDisplayType[state];
    locationURL = this.getLocationURL(baseRateLevel, rateLevel, valueKey);
    this.loadValues(valueKey.baseServiceURL, locationURL, this.coverageDisplayTypeService);

    console.log("loading complete")
  }

  private setupQuote(type:string, state:string, zipCode:string, effectiveDate:string, quoteID:string, dateOfBirth:string, agentCode:string, initiatedBy:string, email:string,
                      lastName:string, channel:string, promoCode:string, referralCode:string, lgSrc:string, lgSubSrc:string, adID:string, campaignName:string, creativeName:string, campaignSource:string,
                      campaignTactic:string, campaignType:string, cID:string, token:string, dfcToken:string, deviceType:string, partnerClickID:string) {
    // switch (type) {
    //   case('create'): {
    //     let zipPromise = this.addressService.getZipDetail(zipCode);
    //     zipPromise.then((resp: any) => {
    //       let zipInfo = this.getZipInfo(resp.response, state);
    //       let createPromise = this.createSubmission(zipInfo, effectiveDate, 'PersonalAuto', agentCode, initiatedBy,
    //         promoCode, referralCode, lgSrc, lgSubSrc, adID, campaignName, creativeName, campaignSource,
    //         campaignTactic, campaignType, cID, dfcToken, deviceType, partnerClickID);
    //       createPromise.then((resp) => {
    //           //need to check messages
    //           this.submissionObj = resp.getResponse();
    //           if (this.submissionObj.quoteID) {
    //             this.appConstants.TransportGatewaySettings.gatewayHeaders.relatedTransactionId = this.submissionObj.quoteID;
    //           }
    //
    //           if (this.submissionObj.baseData && this.submissionObj.baseData.policyAddress) {
    //             // TODO - change to observables
    //             //Sends information needed in order to properly perform refresh
    //             //$rootScope.$emit('retrievalInfo', [this.submissionObj.baseData.policyAddress.postalCode, this.submissionObj.quoteID, this.submissionObj.baseData.policyAddress.state]);
    //           }
    //           //Sends information needed to perform About You Refresh
    //           // TODO - change to observables
    //           //$rootScope.$emit('subInfo', [this.submissionObj]);
    //           loadPageData(submissionObj, zipInfo.state).then(function (resp) {
    //               deferred.resolve(resp);
    //             },
    //             function (error) {
    //               deferred.reject(error);
    //             }
    //           );
    //         }, function (error) { //create submission
    //           deferred.reject(error);
    //         }
    //       );
    //     }, function (error) { //zip
    //       deferred.reject(error);
    //     })
    //     break;
    //   }
      // case('retrieve'):{
      //   this.appConstants.TransportGatewaySettings.gatewayHeaders.relatedTransactionId = quoteID;
      //   $rootScope.$emit('retrievalInfo', [zipCode, quoteID]);
      //   var createPromise = retrieveSubmission(zipCode, quoteID, dateOfBirth, email, lastName, channel, adID,
      //     campaignName, creativeName, campaignSource, campaignTactic, campaignType, cID, token, deviceType, partnerClickID);
      //   createPromise.then(
      //     function(resp){
      //       //need to check messages
      //       submissionObj = resp.getResponse();
      //       //Grabs submissionInfo for empty AY refresh
      //       if (submissionObj.quoteStatus == "unableToRetrieve"){
      //         var subInfo = sessionStorage.getItem('subInfo');
      //         submissionObj = (subInfo && subInfo != null && subInfo != "undefined") ? JSON.parse(subInfo) : submissionObj;
      //       }
      //       if(submissionObj && submissionObj.baseData){
      //         if(submissionObj.quoteStatus == "retrieveRentQuote"){
      //           retrieveRentHOCQuote(submissionObj, "rent");
      //         }
      //         else if(submissionObj.quoteStatus == "retrieveHOCQuote"){
      //           retrieveRentHOCQuote(submissionObj, "home");
      //         }
      //         var state = submissionObj.baseData.policyAddress.state;
      //         /**Sends quote retrieval info to rootScope. Done here to support refresh for quote retrieved**/
      //         $rootScope.$emit('retrievalInfo', [submissionObj.baseData.policyAddress.postalCode, submissionObj.quoteID,
      //           submissionObj.baseData.policyAddress.state, submissionObj.baseData.accountHolder.emailAddress1,
      //           submissionObj.baseData.accountHolder.lastName]);
      //         loadPageData(submissionObj, state).then(function(resp){
      //             deferred.resolve(resp);
      //           },
      //           function(error){
      //             deferred.reject(error);
      //           });
      //       }else{
      //         if(submissionObj && submissionObj.quoteStatus){
      //           deferred.resolve(submissionObj.quoteStatus);
      //         }else{
      //           deferred.reject("Unable to get policy information.");
      //         }
      //       }
      //
      //     },
      //     function(error){
      //       deferred.reject(error);
      //     }
      //   );
      //
      //   break;
      // }
      // }
      // return deferred.promise;
    // }
  }

  protected createSubmission(zipInfo:any, effectiveDate:any, lob:string, agentCode:string, initiatedBy:string, promoCode:string, referralCode:string, lgsrc:string,
                            lgsubsrc:string, adID:string, campaignName:string, creativeName:string, campaignSource:string, campaignTactic:string,
                             campaignType:string, cID:string, dfcToken:string, deviceType:string, partnerClickID:string) {
    let draftData = this.createDraftData(lob, effectiveDate, zipInfo);
    let submissionObj = new Submission(draftData);
    submissionObj.agency = {
      agencyCode : agentCode
    }
    submissionObj.baseData.quoteInfo = {
      promotionSource : promoCode,
      referralCode : referralCode,
      initiatedBy: initiatedBy,
      lgsrc: lgsrc,
      lgsubsrc: lgsubsrc,
      adID:adID,
      campaignName:campaignName,
      creativeName:creativeName,
      campaignSource:campaignSource,
      campaignTactic:campaignTactic,
      campaignType:campaignType,
      cID:cID,
      partnerClickID: partnerClickID,
      dfcStoreToken:dfcToken,
      deviceTypeStart: deviceType
    }
//     var retPromise = LoadSaveService.createSubmission('quoteandbind', submissionObj);
// //        retPromise = retPromise.then(function (draftSubmission) {
// //            submissionObj = draftSubmission;
// //            return submissionObj;
// //        });
//     return retPromise;
  }

}

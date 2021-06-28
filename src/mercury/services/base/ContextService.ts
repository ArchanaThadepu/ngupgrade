import {Injectable, Inject, Component} from '@angular/core';

import {DOCUMENT} from '@angular/common';

import {InitialLoadingService} from './../InitialLoadingService';
import {AppConstants} from '../../config/AppConstants';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  //public variables
  public isMobile: boolean = false;
  public quoteID: any;
  public state: any;
  public rateHasChanged: boolean = false;

  //private variables
  private readonly envConfig: any;
  private submissionObj: any;
  private agency: any;
  private sessionData: any;
  private effectiveDate: any;
  private lob: any;

  //ctor

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appConstants: AppConstants,
    private initialLoadingService: InitialLoadingService
  ) {
    this.envConfig = appConstants.EnvConfig;
    let effDate = new Date();
    let zipCode = "89002";
    let stateCode = "NV";
    let agentCode = "";
    let initiatedBy = "AL";
    let adID = "";
    let campaignName = "";
    let creativeName = "";
    let campaignSource = "";
    let campaignTactic = "";
    let campaignType = "";
    let cID = "";
    let partnerClickID = "";
    let deviceType = "Desktop";
    let promoCode;
    let lgsrc = "";
    let lgsubsrc = "";
    let referralCode = "";
    let dfcToken = "";

    let retPromise = this.initializeContext('create', zipCode, stateCode, effDate.toJSON(), null,
      null, agentCode, initiatedBy, null, null, null, promoCode, referralCode, lgsrc, lgsubsrc, adID,
      campaignName, creativeName, campaignSource, campaignTactic, campaignType, cID, null, dfcToken, deviceType, partnerClickID);
    this.updateData(this.state, "baseRateLevel");
  }

  //functions
  public initializeContext(type: string, zipCode: string, stateCode: string, effectiveDate: any, inQuoteID: any, dateOfBirth: any, agentCode: any, initiatedBy: any, email: any, lastName: any, channel: any, promoCode: any, referralCode: any, lgsrc: any, lgsubsrc: any, adID: any, campaignName: any, creativeName: any, campaignSource: any, campaignTactic: any, campaignType: any, cID: any, token: any, dfcToken: any, deviceType: any, partnerClickID: any) {
    this.state = stateCode;
    let retPromise = this.initialLoadingService.initializeContext(type, this.state, zipCode, effectiveDate, inQuoteID, dateOfBirth, agentCode, initiatedBy, email, lastName, channel, promoCode, referralCode, lgsrc, lgsubsrc, adID, campaignName, creativeName, campaignSource, campaignTactic, campaignType, cID, token, dfcToken, deviceType, partnerClickID);
    if (retPromise) {
      retPromise.then((resp: any) => {
        this.submissionObj = this.initialLoadingService.getSubmission();
        if (this.submissionObj.agency) {
          this.agency = this.submissionObj.agency;
        }

        if (this.submissionObj && this.submissionObj.baseData && this.submissionObj.baseData.policyAddress) {
          this.state = this.submissionObj.baseData.policyAddress.state;
          this.quoteID = this.submissionObj.quoteID;
        }
      });
    }
    this.setIsIOS();
    this.setIsMobile();
    return retPromise;
  }

  public getQuoteID() {
    return this.quoteID;
  }

  public getSubmission() {
    return this.submissionObj;
  }

  public setSubmission(submission: any) {
    this.submissionObj = submission;

    if (submission && submission.baseData.quoteInfo) {
      this.sessionData.setQuoteType(submission.baseData.quoteInfo.quoteType);
    }
  }

  public getAgency() {
    return this.agency;
  }

  public setAgency(agencyInfo: any) {
    this.agency = agencyInfo;
  }

  public getSessionData() {
    return this.sessionData;
  }

  public setQuoteID(id: any) {
    this.quoteID = id;
  }

  public setSessionData(session: any) {
    this.sessionData = session;
  }

  public getState() {
    return this.state;
  }

  public setState(stateCode: any) {
    this.state = stateCode;
  }

  public getLOB() {
    return this.lob;
  }

  public setLOB(lobCode: any) {
    this.lob = lobCode;
  }

  public getEffectiveDate() {
    return this.effectiveDate;
  }

  public setEffectiveDate(effectiveDateIn: any) {
    this.effectiveDate = effectiveDateIn;
  }

  public getIsMobile() {
    this.setIsMobile();
    return this.isMobile;
  }

  public setIsMobile() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public setIsIOS() {
    if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Mac/i)) {
      // @ts-ignore
      document.getElementById('html').addClass('iOS');
    }
  }

  public isLoggingEnable() {
    return this.envConfig.enableLogging;
  }

  public setRateHasChanged(rateChanged: any) {
    this.rateHasChanged = rateChanged;
  }

  public isRateHasChanged() {
    return this.rateHasChanged;
  }

  public updateData(state: any, rateLevel: any) {
    this.initialLoadingService.updateData(this.appConstants.PageProperties, state, rateLevel);
  }

}




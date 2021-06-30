import { Component, OnInit } from '@angular/core';
import { ContextService } from "../../mercury/services/base/ContextService";
import { AddressService } from "../../mercury/services/AddressService";
import * as _ from "underscore";
import { Submission } from "../../edge/quoteandbind/common/models/Submission";
import { IBusinessService } from "../../mercury/services/base/IBusinessService";
import { ValidValueService } from "../../mercury/services/ValidValueService";
import { MessageService } from "../../mercury/services/MessageService";
import { LabelService } from "../../mercury/services/LabelService";
import { HelpService } from "../../mercury/services/HelpService";
import { CoverageDisplayTypeService } from "../../mercury/services/CoverageDisplayTypeService";
import { HideShowService } from "../../mercury/services/HideShowService";
import { ConstraintValuesService } from "../../mercury/services/ConstraintValuesService";
import { AppConstants } from "../../mercury/config/AppConstants";
import { AboutYouUIAdapter } from "../../mercury/services/impl/uiAdapter/AboutYouUIAdapter";
import { ActivatedRoute } from "@angular/router";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MIGValidDate } from 'src/mercury/directives/MIGValidDate';

declare let $: any;


@Component({
  selector: 'app-about-you',
  templateUrl: './about-you.component.html',
  styleUrls: ['./about-you.component.css']
})
export class AboutYouComponent implements OnInit {

  private validateDOBAsEmpty: boolean = false;
  private dateOfBirthModel: string = "";
  private periodStartDate: string = "";
  private userInfo: any;
  private userAddress: any;
  zipCode: string | null = "";
  private policySplitTerritory: any;
  private postalCodeUI: string = "";
  private aboutYouUIAdapter: AboutYouUIAdapter;

  public aboutYouForm: FormGroup;

  invalidOutOfStateZip: boolean = false;
  submitted: boolean = false;
  updateQuote: boolean = false;
  isAgg: boolean = false;
  menuEditMode: boolean = false;
  percentComplete: number = 0
  consumerIDMobile: string = "";
  page: string = "";
  baseData: any;
  errors: any = [];
  messages: any = [];
  hideDateOfBirth: boolean = false;
  showPhoneNumberEmail: boolean = true;
  tipShown: boolean = false;
  polite: any;
  contactNumber: string = "(000)-000 0000";
  splitTerritories: any = [];
  consumerID: string = "consumerID";

  //masks
  phoneNumberMask: string = "";
  dateOfBirthMask: string = "";
  zipCodeMask: string = "";
  submission: Submission;
  suffix: any = []
  state: string | null = "";
  constructor(
    protected contextService: ContextService,
    protected addressService: AddressService,
    protected businessService: IBusinessService,
    protected validValueService: ValidValueService,
    protected messageService: MessageService,
    protected labelService: LabelService,
    protected helpService: HelpService,
    protected coverageDisplayTypeService: CoverageDisplayTypeService,
    protected hideShowService: HideShowService,
    protected constraintValuesService: ConstraintValuesService,
    protected appConstants: AppConstants,
    private route: ActivatedRoute,

    private formBuilder: FormBuilder,
    private MIGValidDate : MIGValidDate
  ) {
    this.aboutYouUIAdapter = new AboutYouUIAdapter(businessService, validValueService, messageService,
      labelService, helpService, coverageDisplayTypeService, hideShowService, constraintValuesService, appConstants, contextService);
    this.submission = this.getInitialData();

    this.aboutYouForm = formBuilder.group({
      firstName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      lastName:  ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      dateOfBirth : ['', [Validators.required,this.MIGValidDate.dateValidator()]],
      addressLine1 :[''],
      suffix : [''],
      address: ''
    });


  }

  ngOnInit(): void {
    this.page = "aboutYou"
    this.zipCodeMask = '00000';
    this.phoneNumberMask = '(000) 000-0000';
    this.dateOfBirthMask = '00/00/0000';

    const routeParams = this.route.snapshot.paramMap;
    this.state = routeParams.get('state');
    this.zipCode = routeParams.get('zipCode');
  }

  submit(valid: any, page: any, baseData: any) {

  }
  get f() { return this.aboutYouForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.aboutYouForm.invalid) {
      return;
    }
    console.log(this.aboutYouForm.value);
  }
  public getInitialData(): Submission {
    this.aboutYouUIAdapter.getInitialData();
    let context = this.aboutYouUIAdapter.getContextService();
    console.log("valid values == " + this.aboutYouUIAdapter.getValidValues());
    let values = this.validValueService.getFilteredTypeListByFilter("nameSuffix");
    if (values) {
      values.forEach((value: any) => {
        this.suffix.push({
          "id": value.code,
          "name": value.displayName
        });
      });
    }
    let submission = context.getSubmission();
    console.log(this.suffix);
    //Tracking.doTracking('aboutYou');

    this.showPhoneNumberEmail = false;//(Utils.getCookie("phoneNumberEmailMove").indexOf("YES") >= 0) ? false : true;
    this.validateDOBAsEmpty = false;

    if (submission && submission.baseData && submission.baseData.accountHolder) {
      let phoneNum = submission.baseData.accountHolder.homeNumber;
      if (phoneNum) {
        submission.baseData.accountHolder.homeNumber = phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      }

      if (submission.baseData.accountHolder.prefilledDateOfBirth.indexOf("●") >= 0) {
        // $('.dateOfBirth label').addClass('focus');
        // $('input#dateOfBirth').attr('placeholder', submission.baseData.accountHolder.prefilledDateOfBirth);
        this.validateDOBAsEmpty = true;
      }

      this.dateOfBirthModel = submission.baseData.accountHolder.dateOfBirth ? submission.baseData.accountHolder.dateOfBirth : "";
    }

    if (submission && submission.baseData) {
      let periodStDate = submission.baseData.periodStartDate;
      this.periodStartDate = (submission.baseData.periodStartDate) ? (new Date(periodStDate.year, periodStDate.month, periodStDate.day)).toJSON() : new Date().toJSON();
    }

    // Shifts DOB input to prevent placeholder from creating a bold effect on IE
    // if (this.stateHideShow.firstNameSecondaryLabel == 'show' && (/MSIE \d|Trident.*rv:/.test(navigator.userAgent))){
    //   $('input#dateOfBirth').css('top', '0px');
    // }

    if (submission && submission.baseData && submission.baseData.policyAddress) {
      this.addressService.formatAddressLine2(submission.baseData.policyAddress);
    }

    this.consumerID = "consumerDisclosure";
    this.consumerIDMobile = "consumerDisclosureMobile";
    if (submission && submission.baseData.quoteInfo) {
      this.isAgg = submission.baseData.quoteInfo.aggregatorFlag;
      if (submission.baseData.quoteInfo.aggregatorFlag) {
        this.consumerID = "consumerDisclosureAgg";
        this.consumerIDMobile = "consumerDisclosureAggMobile";
      }
    }

    let drivers = submission?.lobData.personalAuto.coverables.drivers;

    let insuredDriver: any = [];//$filter('filter')(drivers, { relationship_Ext: "insured" });

    if (insuredDriver.length > 0 && insuredDriver[0].completed == true)
      this.hideDateOfBirth = true;

    this.contactNumber = "";//ConfigurationValuesService.getContactNumbers(context.getState()).default;
    //setup address and name in scope to detect address changed
    if (submission) {
      this.userAddress = _.clone(context.getSubmission().baseData.policyAddress)
      this.userInfo = _.clone(context.getSubmission().baseData.accountHolder);
    }

    this.policySplitTerritory = context.getSessionData()?.isPolicySplitTerritory;

    if (submission && submission.baseData.policyAddress.postalCode != null) {
      let zipCodePlus4 = submission.baseData.policyAddress.postalCode;
      let zipCodeArray = zipCodePlus4.split('-');
      this.postalCodeUI = zipCodeArray[0];
    }

    // $scope.getZipDetail = function(zipCode){
    //   var zipValidated = ctrl.isZipValidated(zipCode);
    //   var defer = $q.defer();
    //
    //   if(!zipValidated){
    //     var zipRetPromise = AboutYouUiAdapter.getZipDetail(zipCode);
    //     $scope.invalidOutOfStateZip = false;
    //     //$scope.splitTerritories = {};
    //     zipRetPromise.then(function(resp){
    //
    //       if(resp!==undefined){
    //         var response = resp.getResponse();
    //         if (response && response.length > 0){
    //           //valid zip, but may not be in the same state
    //           //$scope.draftData.policyAddress.state = resp.addressStandardRecords[0].state;
    //           var zipInfo = response[0];
    //           if (zipInfo.state != context.getState()){
    //             //valid, but out of state
    //             $scope.aboutYouForm.postalCodeUI.$setValidity('validZip', false);
    //             $scope.invalidOutOfStateZip = true
    //             defer.resolve(false);
    //           }else{
    //             //valid and in the same state
    //             $scope.baseData.policyAddress.city = zipInfo.city;
    //             $scope.aboutYouForm.city.$setValidity('city', true);
    //             $scope.aboutYouForm.postalCodeUI.$setValidity('validZip', true);
    //             lastValidatedZip = zipCode;
    //             //Added to fix zip + 4
    //             var savedZip;
    //             if($scope.userAddress.postalCode){
    //               var userZipCodeArray = $scope.userAddress.postalCode.split('-');
    //               savedZip = userZipCodeArray[0];
    //             }
    //             if(zipCode != savedZip){
    //               submission.baseData.policyAddress.postalCode = $scope.postalCodeUI;
    //             }
    //             // update county for PPA
    //             if(response[0].county && response[0].county != ''){
    //               submission.baseData.policyAddress.county = response[0].county;
    //             }
    //             // call split territories for IL
    //             $scope.getSplitTerritories(zipCode);
    //             defer.resolve(true);
    //           }
    //
    //         }else{
    //           // invalid zip
    //           $scope.aboutYouForm.postalCodeUI.$setValidity('validZip', false);
    //           defer.resolve(false);
    //
    //         }
    //       }
    //     });
    //     // ModalService.showProgressDialog("Please wait while we save your information.", zipRetPromise);
    //   }else{
    //     defer.resolve(true);
    //   }
    //
    //   return defer.promise;
    //
    //
    // };
    // $scope.baseData.policySplitTerritory = AboutYouUiAdapter.getContextService().getSessionData().isPolicySplitTerritory();

    if (this.baseData && this.baseData.policyAddress) {
      this.zipCode = this.baseData.policyAddress.postalCode;
      //$scope.getSplitTerritories($scope.zipCode);
    }

    this.tipShown = false;

    //PageLoadService.measurePageLoad();
    return submission;
  }

  public getSplitTerritories(context: any, zipCode: string) {
    this.splitTerritories = {};
    // if (context.getState() == "IL"){
    //   AboutYouUiAdapter.getSplitTerritories(zipCode).then(function (resp){
    //     if(resp!==undefined){
    //       var data = resp.getResponse().data;
    //       if (data){
    //         if (data.length > 0 ){
    //           $scope.splitTerritories=data;
    //         }
    //       }
    //       else{
    //       }
    //     }else{
    //     }
    //   });}
  };

  showTip() {

  }
}

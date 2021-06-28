import {IBusinessService} from "./IBusinessService";
import {ValidValueService} from "../ValidValueService";
import {MessageService} from "../MessageService";
import {LabelService} from "../LabelService";
import {HelpService} from "../HelpService";
import {CoverageDisplayTypeService} from "../CoverageDisplayTypeService";
import {HideShowService} from "../HideShowService";
import {ConstraintValuesService} from "../ConstraintValuesService";
import {AppConstants} from "../../config/AppConstants";
import {ContextService} from "./ContextService";
import {Submission} from "../../../edge/quoteandbind/common/models/Submission";
import {BaseCtrl} from "./BaseCtrl";


export class AbstractUIAdapter extends BaseCtrl {
  private errors: any = [];


  constructor(
    protected businessService: IBusinessService,
    protected validValueService: ValidValueService,
    protected messageService: MessageService,
    protected labelService: LabelService,
    protected helpService: HelpService,
    protected coverageDisplayTypeService: CoverageDisplayTypeService,
    protected hideShowService: HideShowService,
    protected constraintValuesService: ConstraintValuesService,
    protected appConstants: AppConstants,
    protected contextService: ContextService
  ) {
    super();
  }

  public retrieveConfigValue(pageName: string, type: string) {
    let fields = this.appConstants.FieldProperties[pageName];
    let i, field, fieldKey;
    let values: any = [];
    if (fields === undefined) {
      return values;
    }
    for (i = 0; i < fields.length; i++) {
      field = fields[i];
      let options = [];
      switch (type) {
        case('validValue'): {
          if (field.validValueKey == undefined) {
            continue;
          }
          options = this.validValueService.getFilteredTypeListByFilter(field.validValueKey);
          break;
        }
        case('label'): {
          if (field.labelValueKey == undefined) {
            continue;
          }

          options = this.labelService.getLabel(field.labelValueKey);
          break;
        }
        // case('coverageDisplayType'): {
        //   if (field.coverageDisplayTypeValueKey == undefined) {
        //     continue;
        //   }
        //
        //   options = this.coverageDisplayTypeService.getCoverageDisplayType(field.coverageDisplayTypeValueKey);
        //   break;
        // }
        case('message'): {
          if (field.messageValueKey == undefined) {
            continue;
          }
          options = this.messageService.getMessage(field.messageValueKey);
          break;
        }
        case('hideShow'): {
          if (field.hideShowValueKey == undefined) {
            continue;
          }
          options = this.hideShowService.getHideShow(field.hideShowValueKey);

          break;
        }
      }
      values[field.fieldID] = options;

      //}
    }
    return values;
  }

  public getInitialData() {
  }

  public getRootScope() {
    return null;//$rootScope;
  }

  public saveData(submissionObj: Submission) {
    if (submissionObj) {
      this.contextService.setSubmission(submissionObj);
      // submissionObj.currentView = this.getPageName();
      // var retPromise = LoadSaveService.saveSubmission('quoteandbind', submissionObj);
      // retPromise.then( (resp:any) => {
      //   submissionObj = resp.getResponse();
      //   this.contextService.setSubmission(submissionObj);
      //   if (submissionObj.agency) {
      //     this.contextService.setAgency(submissionObj.agency);
      //   }
      // });
      // return retPromise;
      return null;
    } else {
      return null;
    }
  }

  public saveAndQuoteData(submissionObj: Submission) {
    if (submissionObj) {
      this.contextService.setSubmission(submissionObj);
      submissionObj.currentView = this.getPageName();
      // var retPromise = LoadSaveService.saveAndQuoteSubmission('quoteandbind', submissionObj);
      // retPromise.then((resp:any) => {
      //   submissionObj = resp.getResponse();
      //   this.contextService.setSubmission(submissionObj);
      // });
      // return retPromise;\
      return null;
    } else {
      return null;
    }
  };

  public handleMessages(resp: any) {
    let nextPage = null;
    let respMessages;
    let messages = this.getErrorCodes();
    if (messages && messages.length > 0) {
      messages.splice(0, messages.length)
    }
    if (resp) {
      respMessages = resp.getMessages();
    }
    if (respMessages && respMessages.length > 0) {
      let message;
      let messageText;
      let severity;
      for (let i in respMessages) {
        nextPage = 'stay';
        message = respMessages[i];
        messageText = this.messageService.getMessage(message.getMessageCode());
        if (messageText) {
          message.setMessage(messageText);
        }
        //Prevents Multiple Session Global Error message from displaying
        if (message.message != "Multiple session") {
          messages.push(message);
        }
        severity = message.getSeverity();
        if (severity == 'CRITICAL' || severity == 'FATAL') {
          nextPage = severity;
          //MessageHandlingService.sendToMessagePage(severity);
          break;
        }
      }

      this.setErrorCodes(messages);
      return nextPage;
    }
    return nextPage;
  }

  public getContextService() {
    return this.contextService;
  }

  public getEnvConfig() {
    return this.appConstants.EnvConfig;
  }

  public getValidValues() {
    return this.validValueService.getValues();
  }

  public getHideShow() {
    return this.retrieveConfigValue(this.getPageName(), 'hideShow');
  }

  public getLabels() {
    return this.retrieveConfigValue(this.getPageName(), 'label');
  }

  public getHelps() {
    return this.helpService.getValues();
  }

  public getCoverageDisplayType() {
    return this.retrieveConfigValue(this.getPageName(), 'coverageDisplayType');
  }

  public getMessages() {
    return this.retrieveConfigValue(this.getPageName(), 'message');
  }

  public getConstraintValues() {
    return this.constraintValuesService.getValues();
  }

  public getPageName() {
    return '';
  }

  public getErrorCodes() {
    if (this.errors === undefined) {
      this.errors = [];
    }
    return this.errors;
  }

  public setErrorCodes(errors: any[]) {
    this.errors = errors;
  }

  public sendToWelcomeBackPage() {
    //MessageHandlingService.sendToWelcomeMessagePage();
  }

}

import {AbstractUIAdapter} from "./AbstractUIAdapter";
import {IBusinessService} from "./IBusinessService";

export class BaseCtrl extends IBusinessService {

  protected uiAdapter: AbstractUIAdapter | undefined;
  protected scope: any;

  constructor() {
    super();
  }

  public handleSessionExpired(uiAdapter: AbstractUIAdapter, scope: any) {
    let context = uiAdapter.getContextService();
    let rootScope = uiAdapter.getRootScope();
    // rootScope.$on("sessionExpired", function(){
    //   if(context){
    //     context.setSubmission(undefined);
    //   }
    //   scope.$destroy();
    // });
  }

  public createInstance(uiAdapter: AbstractUIAdapter, scope: any) {
    // $('.commaMask').mask('00,000', {reverse: true});
    // $('.commaMaskOdometer').mask('000,000', {reverse: true});
    // $('.phoneMask').mask('(000) 000-0000');
    // $('#ssn').mask('000-00-0000');
    // $('.tNHoursMask').mask('00');
    this.uiAdapter = uiAdapter;
    this.scope =  scope;
  }

  public getFrameworkInitialData(uiAdapter: AbstractUIAdapter) {
    this.scope.envConfig = uiAdapter.getEnvConfig();
    this.scope.pageLabels = uiAdapter.getLabels();
    this.scope.helps = uiAdapter.getHelps();
    this.scope.validValues = uiAdapter.getValidValues();
    this.scope.validationMsg = uiAdapter.getMessages();
    this.scope.stateHideShow = uiAdapter.getHideShow();
    this.scope.validations = uiAdapter.getValidations();
    this.scope.constraintValues = uiAdapter.getConstraintValues();
    this.scope.coverageDisplayType = uiAdapter.getCoverageDisplayType();
    this.scope.errors = uiAdapter.getErrorCodes();
    let context = uiAdapter.getContextService();
    let submission = context.getSubmission();
    this.scope.isMobile = context.getIsMobile();
    this.scope.isLoggingEnable = context.isLoggingEnable();
    if (submission) {
      this.scope.quoteID = submission.quoteID;
      this.scope.baseData = submission.baseData;
      this.scope.lobData = submission.lobData
    }
    // if (!this.scope.quoteID && !this.scope.baseData && !uiAdapter.getContextService().getSessionData().getQuoteType() && !uiAdapter.getContextService().getState()) {
    //   uiAdapter.sendToWelcomeBackPage();
    // }

    this.handleSessionExpired(uiAdapter, this.scope);
  }

  public getContextService() {
    // @ts-ignore
    return this.uiAdapter.getContextService();
  }

  public scrollPageTop() {
    // if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
    //   $('body').animate({scrollTop: 0}, 0);
    //   //window.scrollTo(200,100) // first value for left offset, second value for top offset
    // } else {
    //   $('html,body').animate({scrollTop: 0}, 0);
    // }
    // $('.error').attr('role', 'alert');
  }

}


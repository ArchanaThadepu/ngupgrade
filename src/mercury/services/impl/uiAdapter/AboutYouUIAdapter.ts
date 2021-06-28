import {AbstractUIAdapter} from "../../base/AbstractUIAdapter";
import {IBusinessService} from "../../base/IBusinessService";
import {ValidValueService} from "../../ValidValueService";
import {MessageService} from "../../MessageService";
import {LabelService} from "../../LabelService";
import {HelpService} from "../../HelpService";
import {CoverageDisplayTypeService} from "../../CoverageDisplayTypeService";
import {HideShowService} from "../../HideShowService";
import {ConstraintValuesService} from "../../ConstraintValuesService";
import {AppConstants} from "../../../config/AppConstants";
import {ContextService} from "../../base/ContextService";


export class AboutYouUIAdapter extends AbstractUIAdapter {

  constructor(protected businessService: IBusinessService,
              protected validValueService: ValidValueService,
              protected messageService: MessageService,
              protected labelService: LabelService,
              protected helpService: HelpService,
              protected coverageDisplayTypeService: CoverageDisplayTypeService,
              protected hideShowService: HideShowService,
              protected constraintValuesService: ConstraintValuesService,
              protected appConstants: AppConstants,
              protected contextService: ContextService) {
    super(businessService, validValueService, messageService, labelService, helpService,
      coverageDisplayTypeService, hideShowService, constraintValuesService, appConstants, contextService);
    let scope:any = {};
    super.createInstance(this, scope);
    super.getFrameworkInitialData(this);
    console.log(JSON.stringify(this.validValueService.getFilteredTypeListByFilter("nameSuffix")));

  }

  public getInitialData() {
    super.getInitialData();
  }

  public getPageName() {
    return 'aboutYouPage';
  }

}

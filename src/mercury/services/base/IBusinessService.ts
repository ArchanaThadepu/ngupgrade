import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class IBusinessService {
    public init() {
        //OVERRIDE : init function to be implemented by child class
    }

    public getInitialData() {
    }

    public getPageLabels(){}
    public getValidationMessages(){}
    public getHideShowRules(){}
    //public getValidValues(){}
    public getValidations(){}
    public saveData(submission:any){}
    public initiateNext(){}
    public getValidValues(fieldKey:any, fieldValues:any){}
    public getHideShow(fieldKey:any, fieldValue:any){}
    public getAdditionalData(input:any){}
}


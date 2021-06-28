import {Injectable, Inject} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SessionObject {
    //public variables
    //private variables
    protected policySplitTerritory: any;
    protected quoteType: any;

    //ctor
    constructor() {
    }

    //functions
    public setPolicySplitTerritory(policySplitTerritory: any) {
        this.policySplitTerritory = policySplitTerritory;
    }

    public isPolicySplitTerritory() {
        return this.policySplitTerritory;
    }

    public setQuoteType(quoteType: any) {
        this.quoteType = quoteType;
    }

    public getQuoteType() {
        return this.quoteType;
    }

}




import {Injectable, Inject} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class InitialData {
    //public variables
    //private variables
    private data: any;

    //ctor
    constructor() {
    }

    //functions
    public getData(): any {
        return this.data;
    }

    public setData(newData: any) {
        this.data = newData;
    }
}




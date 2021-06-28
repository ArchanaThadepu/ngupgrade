import {Injectable, Inject} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ResultObject {
    //public variables
    //private variables
	protected messages:any;
	protected response:any;
    //ctor
    constructor() {
    }

    //functions
    public setMessages(messages: any) {
        this.messages = messages;
    }

	public getMessages():any {
        return this.messages;
    }

	public setResponse(response: any) {
        this.response = response;
    }

	public getResponse():any {
        return this.response;
    }
}




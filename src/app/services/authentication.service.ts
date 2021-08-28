import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private subject = new Subject<any>();

	login() {
        this.subject.next({ estado: 'login'});
	}
	
	logout() {
        this.subject.next({ estado: 'logout' });
    }

	getMessage(): Observable<any> {
		return this.subject.asObservable();
	}

	onMessage(): Observable<any> {
		return this.subject.asObservable();
	}

	constructor() { }
}
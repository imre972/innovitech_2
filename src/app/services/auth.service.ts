import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private userSubject: BehaviorSubject<boolean>;
	public user: Observable<boolean>;
	constructor() {
		this.userSubject = new BehaviorSubject<boolean>(localStorage.getItem('ACCESS_TOKEN') !== null);
		this.user = this.userSubject.asObservable();
	}

	public get userValue():boolean {
		return this.userSubject.value;
	}

	public signIn(userData: User) {
		localStorage.setItem('ACCESS_TOKEN', 'Password_72');
		this.userSubject.next(true);
	}
	public isLoggedIn() {
		return localStorage.getItem('ACCESS_TOKEN') !== null;
	}
	public logout() {
		localStorage.removeItem('ACCESS_TOKEN');
		this.userSubject.next(false);
	}
	getAuthorizationToken() {
		return localStorage.getItem('ACCESS_TOKEN');
	}
}

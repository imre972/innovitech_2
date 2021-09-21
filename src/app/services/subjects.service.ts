import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
	HttpClient,
	HttpHeaders,
	HttpParams
} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

import {Subject} from '../models/subject.model';
import {HttpErrorHandler, HandleError} from '../http-error-handler.service';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: 'my-auth-token'
	})
};

@Injectable({providedIn: 'root'})
export class SubjectsService {

	private arrayLengthSubject: BehaviorSubject<number>;
	public arrLength: Observable<number>;

	public subjectsAllLength: number;
	subjectsUrl = 'api/subjects/';
	private handleError: HandleError;

	constructor(
		private http: HttpClient,
		httpErrorHandler: HttpErrorHandler
	) {
		this.handleError = httpErrorHandler.createHandleError('SubjectsService_ERROR');
		this.arrayLengthSubject = new BehaviorSubject<number>(this.subjectsAllLength);
		this.arrLength = this.arrayLengthSubject.asObservable();
	}

	findSubjectById(id: number): Observable<Subject> {
		return this.http.get<Subject>(`/api/subjects/${id}`, httpOptions);
	}

	findSubjects(filter = '', sortOrder = 'asc', itemNumber: number, pageIndex: number): Observable<Subject[]> {

		filter = filter.trim();

		const options = filter ?
			{
				params: new HttpParams().set('subjectName', filter),
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'my-auth-token'
				})
			} : httpOptions;

			return this.http.get<Subject[]>(this.subjectsUrl, options)
				.pipe(
					tap(res => {
						this.subjectsAllLength = res.length;
						this.arrayLengthSubject.next(this.subjectsAllLength);
					}),
					map(subjects => subjects.
						filter((subject, index, arr) => {
							return (itemNumber * pageIndex) < index + 1 ? arr[index] : null;
						}).
						filter((subject, index, arr) => {
							return (index < itemNumber) ? arr[index] : null;
						}),
					catchError(this.handleError<Subject[]>('searchSubjects', []))));
	}

	//////// Save methods //////////

	/** POST: add a new subject to the database */
	addSubject(subject: Subject): Observable<Subject> {
		return this.http.post<Subject>(this.subjectsUrl, subject, httpOptions)
			.pipe(
				catchError(this.handleError('addSubject', subject))
		);
	}

	/** DELETE: delete the subject from the server */
	deleteSubject(id: number): Observable<unknown> {
		const url = `${this.subjectsUrl}${id}`; // DELETE api/subjects/id
		return this.http.delete(url, httpOptions)
			.pipe(
				catchError(this.handleError('deleteSubject'))
			);
	}

	/** PUT: update the subject on the server. Returns the updated subject upon success. */
	updateSubject(subject: Subject): Observable<Subject> {
		httpOptions.headers =
			httpOptions.headers.set('Authorization', 'my-new-auth-token');
		return this.http.put<Subject>(this.subjectsUrl, subject, httpOptions)
			.pipe(
				catchError(this.handleError('updateSubject', subject))
			);
	}

}

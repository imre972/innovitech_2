import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {
	HttpClient,
	HttpHeaders,
	HttpParams
} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

import {Warehouse} from '../models/warehouse.model';
import {HttpErrorHandler, HandleError} from '../http-error-handler.service';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: 'my-auth-token'
	})
};

@Injectable({providedIn: 'root'})
export class WarehousesService {

	private arrayLengthSubject: BehaviorSubject<number>;
	public arrLength: Observable<number>;

	public warehousesAllLength: number;
	warehousesUrl = 'api/warehouses/';
	private handleError: HandleError;

	constructor(
		private http: HttpClient,
		httpErrorHandler: HttpErrorHandler
	) {
		this.handleError = httpErrorHandler.createHandleError('SubjectsService_ERROR');
		this.arrayLengthSubject = new BehaviorSubject<number>(this.warehousesAllLength);
		this.arrLength = this.arrayLengthSubject.asObservable();
	}

	findWarehouseById(id: number): Observable<Warehouse> {
		return this.http.get<Warehouse>(`/api/warehouses/${id}`, httpOptions);
	}

	findWarehouses(filter = '', sortOrder = 'asc', itemNumber: number, pageIndex: number): Observable<Warehouse[]> {

		filter = filter.trim();

		const options = filter ?
			{
				params: new HttpParams().set('warehouseAddress', filter),
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					Authorization: 'my-auth-token'
				})
			} : httpOptions;

		return this.http.get<Warehouse[]>(this.warehousesUrl, options)
			.pipe(
				tap(res => {
					this.warehousesAllLength = res.length;
					this.arrayLengthSubject.next(this.warehousesAllLength);
				}),
				map(warehouses => warehouses.
					filter((warehouse, index, arr) => {
						return (itemNumber * pageIndex) < index + 1 ? arr[index] : null;
					}).
					filter((warehouse, index, arr) => {
						return (index < itemNumber) ? arr[index] : null;
					}),
					catchError(this.handleError<Warehouse[]>('searchWarehouses', []))));
	}

	//////// Save methods //////////

	/** POST: add a new warehouse to the database */
	addWarehouse(warehouse: Warehouse): Observable<Warehouse> {
		return this.http.post<Warehouse>(this.warehousesUrl, warehouse, httpOptions)
			.pipe(
				catchError(this.handleError('addWarehouse', warehouse))
			);
	}

	/** DELETE: delete the warehouse from the server */
	deleteWarehouse(id: number): Observable<unknown> {
		const url = `${this.warehousesUrl}${id}`; // DELETE api/warehouses/id
		return this.http.delete(url, httpOptions)
			.pipe(
				catchError(this.handleError('deleteWarehouse'))
			);
	}

	/** PUT: update the warehouse on the server. Returns the updated warehouse upon success. */
	updateWarehouse(warehouse: Warehouse): Observable<Warehouse> {
		httpOptions.headers =
			httpOptions.headers.set('Authorization', 'my-new-auth-token');
		return this.http.put<Warehouse>(this.warehousesUrl, warehouse, httpOptions)
			.pipe(
				catchError(this.handleError('updateWarehouse', warehouse))
			);
	}

}

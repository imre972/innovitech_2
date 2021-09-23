import {
	CollectionViewer,
	DataSource
} from "@angular/cdk/collections";
import {of} from "rxjs";
import {
	BehaviorSubject,
	Observable
} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {Warehouse} from '../models/warehouse.model';
import {WarehousesService} from '../services/warehouse.service';

export class WarehousesDataSource implements DataSource<Warehouse> {

	private warehousesSubject = new BehaviorSubject<Warehouse[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	constructor(private warehousesService: WarehousesService) {}

	loadWarehouses(filter: string,
		sortDirection: string,
		items: number,
		pageIndex: number) {

		this.loadingSubject.next(true);

		this.warehousesService.findWarehouses(filter, sortDirection, items, pageIndex).pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		)
			.subscribe(Warehouses => {
				this.warehousesSubject.next(Warehouses);
			});
	}

	connect(collectionViewer: CollectionViewer): Observable<Warehouse[]> {
		return this.warehousesSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.warehousesSubject.complete();
		this.loadingSubject.complete();
	}

}

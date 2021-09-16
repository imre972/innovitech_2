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
import {Subject} from '../models/subject.model';
import {SubjectsService} from '../services/subjects.service';

export class SubjectsDataSource implements DataSource<Subject> {

	private subjectsSubject = new BehaviorSubject<Subject[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	constructor(private subjectsService: SubjectsService) {}

	loadSubjects(filter: string,
				sortDirection: string,
				items: number,
				pageIndex: number) {

		this.loadingSubject.next(true);

		this.subjectsService.findSubjects(filter, sortDirection, items, pageIndex).pipe(
				catchError(() => of([])),
				finalize(() => this.loadingSubject.next(false))
			)
			.subscribe(subjects => {
				this.subjectsSubject.next(subjects);
			});
	}

	connect(collectionViewer: CollectionViewer): Observable<Subject[]> {
		return this.subjectsSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.subjectsSubject.complete();
		this.loadingSubject.complete();
	}

}

import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Subject} from "./../models/subject.model";
import {Observable} from "rxjs";
import {SubjectsService} from "./subjects.service";



@Injectable()
export class SubjectResolver implements Resolve<Subject> {

	constructor(private subjectsService: SubjectsService) {

	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subject> {
		return this.subjectsService.findSubjectById(route.params['id']);
	}

}

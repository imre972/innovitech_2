import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Warehouse} from "./../models/warehouse.model";
import {Observable} from "rxjs";
import {WarehousesService} from "./warehouse.service";



@Injectable()
export class WarehouseResolver implements Resolve<Warehouse> {

	constructor(private warehousesService: WarehousesService) {

	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Warehouse> {
		return this.warehousesService.findWarehouseById(route.params['id']);
	}

}

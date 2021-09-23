import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Warehouse} from '../models/warehouse.model';
import {WarehousesService} from '../services/warehouse.service';
import {AuthService} from '../services/auth.service';

@Component({
	selector: 'warehouse-creator',
	templateUrl: 'warehouse-creator.component.html',
	providers: [WarehousesService],
	styleUrls: ['./warehouse-creator.component.scss']
})

export class WarehouseCreatorDialog {
	warehouse: Warehouse | undefined; // the warehouse currently being edited
	warehouses: Warehouse[] = [];

	constructor(private warehouseService: WarehousesService,
		private authService: AuthService,
		public dialogRef: MatDialogRef<WarehouseCreatorDialog>,
		@Inject(MAT_DIALOG_DATA) public data: Warehouse) {}

	onCancelClick(): void {
		this.dialogRef.close();
	}

	onSaveClick(id: number,
		warehouseAddress: string,
		warehouseLength: number,
		warehouseWidth: number): void {
		if (this.authService.userValue) {
			if (id !== 0) {
				this.edit(id, warehouseAddress, warehouseLength, warehouseWidth);
				this.dialogRef.close();
			} else {
				this.add(warehouseAddress, warehouseLength, warehouseWidth);
				this.dialogRef.close();
			}
		}
	}

	edit(id: number,
		warehouseAddress: string,
		warehouseLength: number,
		warehouseWidth: number) {
		let warehouseButton = 'GOMB HELYETT NYOMHATÓ A SOR';
		this.warehouse = {id, warehouseAddress, warehouseLength, warehouseWidth, warehouseButton} as Warehouse;
		this.update();
	}

	update() {
		if (this.warehouse) {
			this.warehouseService
				.updateWarehouse(this.warehouse)
				.subscribe(warehouse => {
					// replace the warehouse in the warehouses list with update from server
					const ix = warehouse ? this.warehouses.findIndex(h => h.id === warehouse.id) : -1;
					if (ix > -1) {
						this.warehouses[ix] = warehouse;
					}
				});
			this.warehouse = undefined;
		}
	}

	add(warehouseAddress: string,
		warehouseLength: number,
		warehouseWidth: number): void {
		this.warehouse = undefined;
		warehouseAddress = warehouseAddress.trim();
		if (!warehouseAddress) {
			return;
		}
		let warehouseButton = 'GOMB HELYETT NYOMHATÓ A SOR';
		// The server will generate the id for this new subject
		const newWarehouse: Warehouse = {warehouseAddress, warehouseLength, warehouseWidth, warehouseButton} as Warehouse;
		this.warehouseService
			.addWarehouse(newWarehouse)
			.subscribe(warehouse => this.warehouses.push(warehouse));
	}

}

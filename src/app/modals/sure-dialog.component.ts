import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Subject} from '../models/subject.model';
import {Warehouse} from '../models/warehouse.model';
import {SubjectsService} from '../services/subjects.service';
import {WarehousesService} from '../services/warehouse.service';
import {AuthService} from '../services/auth.service';

@Component({
	selector: 'sure-dialog',
	templateUrl: 'sure-dialog.component.html',
	styleUrls: ['./sure-dialog.component.scss']
})
export class SureDialogComponent {

	dialogText: string;

	constructor(private subjectService: SubjectsService,
		private warehouseService: WarehousesService,
		private authService: AuthService,
		public dialogRef: MatDialogRef<SureDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data_1: Subject,
		@Inject(MAT_DIALOG_DATA) public data_2: Warehouse) {
		if (data_1.subjectName) {
			this.dialogText = data_1.subjectName;
		} else if (data_2.warehouseAddress) {
			this.dialogText = data_2.warehouseAddress;
		}
		}

	onNoClick() {
			this.dialogRef.close();
	}

	deleteSW(): void {
		if (this.authService.userValue) {
			if (this.dialogRef.componentInstance.data_1.id) {
				this.subjectService
					.deleteSubject(this.dialogRef.componentInstance.data_1.id)
					.subscribe();
				this.dialogRef.close();
			} else if (this.dialogRef.componentInstance.data_2.id) {
				this.warehouseService
					.deleteWarehouse(this.dialogRef.componentInstance.data_2.id)
					.subscribe();
				this.dialogRef.close();
			}
		}
	}
}

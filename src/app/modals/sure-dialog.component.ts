import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Subject} from '../models/subject.model';
import {SubjectsService} from '../services/subjects.service';
import {AuthService} from '../services/auth.service';

@Component({
	selector: 'sure-dialog',
	templateUrl: 'sure-dialog.component.html',
	styleUrls: ['./sure-dialog.component.scss']
})
export class SureDialogComponent {
	constructor(private subjectService: SubjectsService,
		private authService: AuthService,
		public dialogRef: MatDialogRef<SureDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Subject) {}

	onNoClick() {
		this.dialogRef.close();
	}

	deleteSub(): void {
		if (this.authService.userValue) {
			this.subjectService
				.deleteSubject(this.dialogRef.componentInstance.data.id)
				.subscribe();
			this.dialogRef.close();
		}
		/*
		// oops ... subscribe() is missing so nothing happens
		this.subjectsService.deleteSubject(subject.id);
		*/
	}
}

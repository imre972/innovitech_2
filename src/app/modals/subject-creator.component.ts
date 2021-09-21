import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Subject} from '../models/subject.model';
import {SubjectsService} from '../services/subjects.service';
import {AuthService} from '../services/auth.service';

@Component({
	selector: 'subject-creator',
	templateUrl: 'subject-creator.component.html',
	providers: [SubjectsService],
	styleUrls: ['./subject-creator.component.scss']
})

export class SubjectCreatorDialog {
	subject: Subject | undefined; // the subject currently being edited
	subjects: Subject[] = [];

	constructor(private subjectService: SubjectsService,
		private authService: AuthService,
		public dialogRef: MatDialogRef<SubjectCreatorDialog>,
		@Inject(MAT_DIALOG_DATA) public data: Subject) {}

	onCancelClick(): void {
		this.dialogRef.close();
	}

	onSaveClick(id: number,
		subjectName: string,
		subjectLength: number,
		subjectWidth: number): void {
		if (this.authService.userValue) {
			if (id !== 0) {
				this.edit(id, subjectName, subjectLength, subjectWidth, new Date());
				this.dialogRef.close();
			} else {
				this.add(subjectName, subjectLength, subjectWidth, new Date());
				this.dialogRef.close();
			}
		}
	}

	edit(id: number,
		subjectName: string,
		subjectLength: number,
		subjectWidth: number,
		subjectCreationDate: Date) {
		let subjectButton = 'GOMB HELYETT NYOMHATÓ A SOR';
		this.subject = {id, subjectName, subjectLength, subjectWidth, subjectCreationDate, subjectButton} as Subject;
		this.update();
	}

	update() {
		if (this.subject) {
			this.subjectService
				.updateSubject(this.subject)
				.subscribe(subject => {
					// replace the subject in the subjects list with update from server
					const ix = subject ? this.subjects.findIndex(h => h.id === subject.id) : -1;
					if (ix > -1) {
						this.subjects[ix] = subject;
					}
				});
			this.subject = undefined;
		}
	}

	add(subjectName: string,
		subjectLength: number,
		subjectWidth: number,
		subjectCreationDate: Date): void {
		this.subject = undefined;
		subjectName = subjectName.trim();
		if (!subjectName) {
			return;
		}
		let subjectButton = 'GOMB HELYETT NYOMHATÓ A SOR';
		// The server will generate the id for this new subject
		const newSubject: Subject = {subjectName, subjectLength, subjectWidth, subjectCreationDate, subjectButton} as Subject;
		this.subjectService
			.addSubject(newSubject)
			.subscribe(subject => this.subjects.push(subject));
	}

}

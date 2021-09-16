import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Subject} from '../models/subject.model';
import {SubjectsService} from '../services/subjects.service';

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
		public dialogRef: MatDialogRef<SubjectCreatorDialog>,
		@Inject(MAT_DIALOG_DATA) public data: Subject) {}

	onCancelClick(): void {
		this.dialogRef.close();
	}

	onSaveClick(id: number,
		subjectName: string,
		subjectLength: number,
		subjectWidth: number,): void {
		if (id !== 0) {
			console.log('létezik id, ezaz: ', id);
			// this.edit(id, subjectName, subjectLength, subjectWidth, new Date());
			this.dialogRef.close();
		} else {
			this.add(subjectName, subjectLength, subjectWidth, new Date());
			this.dialogRef.close();
		}
	}

	// edit(id: number,
	// 	subjectName: string,
	// 	subjectLength: number,
	// 	subjectWidth: number,
	// 	subjectCreationDate: Date) {
	// 	let subjectButton = 'GOMB HELYETT NYOMHATÓ A SOR';

	// }

	// edit(subject: Subject) {
	// 	this.subject = subject;
	// }

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

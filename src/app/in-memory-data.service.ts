import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Subject} from './models/subject.model';

@Injectable({
	providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		const subjects: Subject[] = [
			{
				id: 1,
				subjectName: 'Dió palló',
				subjectLength: 18,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 2,
				subjectName: 'Fenyő palló',
				subjectLength: 20,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 3,
				subjectName: 'Tölgy palló',
				subjectLength: 23,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 4,
				subjectName: 'Cseresznye palló',
				subjectLength: 13,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 5,
				subjectName: 'Jávor palló',
				subjectLength: 29,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 6,
				subjectName: 'Jegenye palló',
				subjectLength: 28,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 7,
				subjectName: 'Kőris palló',
				subjectLength: 21,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 8,
				subjectName: 'Juhar palló',
				subjectLength: 12,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 9,
				subjectName: 'Mahagóni palló',
				subjectLength: 10,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 10,
				subjectName: 'Ében palló',
				subjectLength: 24,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 11,
				subjectName: 'Vasfa palló',
				subjectLength: 19,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 12,
				subjectName: 'Vörösfenyő palló',
				subjectLength: 30,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 13,
				subjectName: 'Hárs palló',
				subjectLength: 14,
				subjectWidth: 3,
				subjectCreationDate: new Date(),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			}
		];
		return {subjects};
	}
	genId(subjects: Subject[]): number {
		return subjects.length > 0 ? Math.max(...subjects.map(subject => subject.id)) + 1 : 1;
	}

}

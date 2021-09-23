import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Subject} from './models/subject.model';
import {Warehouse} from './models/warehouse.model';

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
				subjectCreationDate: new Date(2020, 0, 1, 0, 30),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 2,
				subjectName: 'Fenyő palló',
				subjectLength: 20,
				subjectWidth: 3,
				subjectCreationDate: new Date(2020, 2, 11, 3, 30),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 3,
				subjectName: 'Tölgy palló',
				subjectLength: 23,
				subjectWidth: 3,
				subjectCreationDate: new Date(2019, 1, 10, 2, 10),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 4,
				subjectName: 'Cseresznye palló',
				subjectLength: 13,
				subjectWidth: 3,
				subjectCreationDate: new Date(2019, 4, 2, 8, 50),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 5,
				subjectName: 'Jávor palló',
				subjectLength: 29,
				subjectWidth: 3,
				subjectCreationDate: new Date(2018, 4, 2, 9, 55),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 6,
				subjectName: 'Jegenye palló',
				subjectLength: 28,
				subjectWidth: 3,
				subjectCreationDate: new Date(2018, 11, 3, 6, 35),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 7,
				subjectName: 'Kőris palló',
				subjectLength: 21,
				subjectWidth: 3,
				subjectCreationDate: new Date(2017, 3, 2, 7, 30),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 8,
				subjectName: 'Juhar palló',
				subjectLength: 12,
				subjectWidth: 3,
				subjectCreationDate: new Date(2020, 9, 13, 12, 38),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 9,
				subjectName: 'Mahagóni palló',
				subjectLength: 10,
				subjectWidth: 3,
				subjectCreationDate: new Date(2021, 3, 3, 3, 33),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 10,
				subjectName: 'Ében palló',
				subjectLength: 24,
				subjectWidth: 3,
				subjectCreationDate: new Date(2021, 7, 2, 9, 50),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 11,
				subjectName: 'Vasfa palló',
				subjectLength: 19,
				subjectWidth: 3,
				subjectCreationDate: new Date(2017, 3, 2, 2, 32),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 12,
				subjectName: 'Vörösfenyő palló',
				subjectLength: 30,
				subjectWidth: 3,
				subjectCreationDate: new Date(2020, 9, 12, 5, 24),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 13,
				subjectName: 'Hárs palló',
				subjectLength: 14,
				subjectWidth: 3,
				subjectCreationDate: new Date(2021, 11, 3, 9, 38),
				subjectButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			}
		];

		const warehouses: Warehouse[] = [
			{
				id: 1,
				warehouseAddress: '1142, Bp. Üllői út 22.',
				warehouseLength: 1180,
				warehouseWidth: 350,
				warehouseButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 2,
				warehouseAddress: '1135, Bp. Reitter F. utca 14.',
				warehouseLength: 2220,
				warehouseWidth: 380,
				warehouseButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			},
			{
				id: 3,
				warehouseAddress: '1130, Bp. Kámfor utca 30.',
				warehouseLength: 2300,
				warehouseWidth: 330,
				warehouseButton: 'GOMB HELYETT NYOMHATÓ A SOR'
			}
		];
		return {subjects, warehouses};
	}
	genId(collection: any[], collectionName: string): number {
		if (collectionName === 'subjects') {
			let subjects: Subject[] = collection;
			return subjects.length > 0 ? Math.max(...subjects.map(subject => subject.id)) + 1 : 1;
		} else {
			let warehouses: Warehouse[] = collection;
			return warehouses.length > 0 ? Math.max(...warehouses.map(warehouse => warehouse.id)) + 1 : 1;
		}
	}

}

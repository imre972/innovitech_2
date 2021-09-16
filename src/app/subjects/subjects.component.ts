import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {MatPaginator} from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {fromEvent, merge} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

import {AuthService} from '../services/auth.service';
import {Subject} from '../models/subject.model';
import {SubjectsService} from '../services/subjects.service';
import {SubjectsDataSource} from '../datasources/subjects-data-source';
import {ContextMenuModel} from '../models/context-menu.model';
import {SubjectCreatorDialog} from '../modals/subject-creator.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements AfterViewInit, OnInit {
  error: any;
  headers: string[] = [];

  subject: Subject | undefined; // the subject currently being edited
  subjects: Subject[] = [];
  dataSource: SubjectsDataSource;
  displayedColumns = ["id", "subjectName", "subjectLength", "subjectCreationDate", "subjectButton"];

  length: number;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex: number = 0;

  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  id: number;
  subjectName: string;
  subjectLength: number;
  subjectWidth?: number;
  subjectCreationDate: Date;

  // ----------------------------------------------

  isDisplayContextMenu: boolean;
  leftClickMenuItems: Array<ContextMenuModel> = [];
  leftClickMenuPositionX: number;
  leftClickMenuPositionY: number;

  displayContextMenu(event, row) {

    this.isDisplayContextMenu = true;

    this.leftClickMenuItems = [
      {
        menuText: 'SZERKESZTÉS',
        menuEvent: 'Handle editing',
      },
      {
        menuText: 'TÖRLÉS',
        menuEvent: 'Handle delete',
      },
    ];

    this.leftClickMenuPositionX = event.clientX;
    this.leftClickMenuPositionY = event.clientY;

    this.id = row.id;
    this.subjectName = row.subjectName;
    this.subjectLength = row.subjectLength;
    this.subjectWidth = row.subjectWidth;
    this.subjectCreationDate = row.subjectCreationDate;

    // console.log('Row clicked: ', row);
    // console.log('event: ', event);
    // console.log('this.leftClickMenuItems: ', this.leftClickMenuItems);
    // console.log('this.isDisplayContextMenu: ', this.isDisplayContextMenu);

  }

  getLeftClickMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.leftClickMenuPositionX}px`,
      top: `${this.leftClickMenuPositionY}px`
    }
  }

  handleMenuItemClick(event) {
    switch (event.data) {
      case this.leftClickMenuItems[0].menuEvent:
        this.isDisplayContextMenu = false;
        this.openDialog();
        // console.log('To handle editing');
        break;
      case this.leftClickMenuItems[1].menuEvent:
        this.isDisplayContextMenu = false;
        // console.log('To handle delete');
    }
  }

  // ----------------------------------------------

  constructor(
    private authService: AuthService,
    private router: Router,
    private subjectsService: SubjectsService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    subjectsService.arrLength.subscribe(arrLength => this.length = arrLength);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubjectCreatorDialog, {
      width: '250px',
      data: {id: this.id, subjectName: this.subjectName, subjectLength: this.subjectLength, subjectWidth: this.subjectWidth}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   console.log('result: ', result);
    //   this.subjectName = result;
    //   this.update();
    // });
  }

  update() {
    if (this.subject) {
      this.subjectsService
        .updateSubject(this.subject)
        .subscribe(subject => {
          // replace the hero in the heroes list with update from server
          const ix = subject ? this.subjects.findIndex(h => h.id === subject.id) : -1;
          if (ix > -1) {
            this.subjects[ix] = subject;
          }
        });
      this.subject = undefined;
    }
  }

  ngOnInit() {
    this.subject = this.route.snapshot.data['subject'];
    // console.log('this.subject: \n\n', this.subject);
    this.dataSource = new SubjectsDataSource(this.subjectsService);
    // console.log('\n\n this.dataSource in subjects.comp: \n\n', this.dataSource);
    this.dataSource.loadSubjects('', 'asc', this.pageSize, this.pageIndex);
  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadSubjectsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadSubjectsPage())
      )
      .subscribe();
  }

  loadSubjectsPage() {
    this.dataSource.loadSubjects(
      this.input.nativeElement.value,
      this.sort.direction,
      this.pageEvent.pageSize === this.pageSize ? this.pageSize : this.pageEvent.pageSize,
      this.pageEvent.pageIndex === this.pageIndex ? this.pageIndex : this.pageEvent.pageIndex
    );
  }

  createSubject() {
    this.id = 0;
    this.subjectName = '';
    this.subjectLength = 0;
    this.subjectWidth = 0;
    this.openDialog();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

}

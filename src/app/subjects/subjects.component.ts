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
import {SureDialogComponent} from '../modals/sure-dialog.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements AfterViewInit, OnInit {
  error: any;
  headers: string[] = [];

  auth: boolean;

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
    if (this.auth) {
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
    }
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
        break;
      case this.leftClickMenuItems[1].menuEvent:
        this.isDisplayContextMenu = false;
        this.openSureDialog();
    }
  }

  // ----------------------------------------------

  constructor(
    private authService: AuthService,
    private router: Router,
    private subjectsService: SubjectsService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    authService.user.subscribe(userVal => userVal ? this.auth = true : this.auth = false);
    subjectsService.arrLength.subscribe(arrLength => this.length = arrLength);
  }

  ngOnInit() {
    this.subject = this.route.snapshot.data['subject'];
    this.dataSource = new SubjectsDataSource(this.subjectsService);
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

  openDialog(): void {
      const dialogRef = this.dialog.open(SubjectCreatorDialog, {
        width: '300px',
        data: {
          id: this.id,
          subjectName: this.subjectName,
          subjectLength: this.subjectLength,
          subjectWidth: this.subjectWidth
        }
      });
      dialogRef.afterClosed().subscribe(() => this.loadSubjectsPage());
  }

  openSureDialog() {
      const dialogRef = this.dialog.open(SureDialogComponent, {
        data: {
          id: this.id,
          subjectName: this.subjectName,
          subjectLength: this.subjectLength,
          subjectWidth: this.subjectWidth,
          subjectCreationDate: this.subjectCreationDate,
          subjectButton: ''
        }
      });

      // dialogRef.afterClosed().pipe(
      //   debounceTime(150),
      //   distinctUntilChanged(),
      //   tap(() => this.loadSubjectsPage())).subscribe();
      dialogRef.afterClosed().subscribe(() => this.loadSubjectsPage());
  }

  loadSubjectsPage() {
      this.dataSource.loadSubjects(
        this.input.nativeElement.value,
        this.sort.direction,
        this.paginator.pageSize,
        this.paginator.pageIndex
      );
  }

  createSubject() {
    if (this.auth) {
      this.id = 0;
      this.subjectName = '';
      this.subjectLength = 0;
      this.subjectWidth = 0;
      this.openDialog();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/subjects/1');
  }

}

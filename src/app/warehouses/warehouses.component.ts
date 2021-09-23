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
import {Warehouse} from '../models/warehouse.model';
import {WarehousesService} from '../services/warehouse.service';
import {WarehousesDataSource} from '../datasources/warehouses-data-source';
import {ContextMenuModel} from '../models/context-menu.model';
import {WarehouseCreatorDialog} from '../modals/warehouse-creator.component';
import {SureDialogComponent} from '../modals/sure-dialog.component';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements AfterViewInit, OnInit {
  error: any;
  headers: string[] = [];

  auth: boolean;

  warehouse: Warehouse | undefined; // the warehouse currently being edited
  warehouses: Warehouse[] = [];
  dataSource: WarehousesDataSource;
  displayedColumns = ["id", "warehouseAddress", "warehouseLength", "warehouseWidth", "warehouseButton"];

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
  warehouseAddress: string;
  warehouseLength: number;
  warehouseWidth: number;

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
      this.warehouseAddress = row.warehouseAddress;
      this.warehouseLength = row.warehouseLength;
      this.warehouseWidth = row.warehousetWidth;
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
    private warehousesService: WarehousesService,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    authService.user.subscribe(userVal => userVal ? this.auth = true : this.auth = false);
    warehousesService.arrLength.subscribe(arrLength => this.length = arrLength);
  }

  ngOnInit() {
    this.warehouse = this.route.snapshot.data['warehouse'];
    this.dataSource = new WarehousesDataSource(this.warehousesService);
    this.dataSource.loadWarehouses('', 'asc', this.pageSize, this.pageIndex);
  }

  ngAfterViewInit() {

    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadWarehousesPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadWarehousesPage())
      )
      .subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WarehouseCreatorDialog, {
      width: '300px',
      data: {
        id: this.id,
        warehouseAddress: this.warehouseAddress,
        warehouseLength: this.warehouseLength,
        warehouseWidth: this.warehouseWidth
      }
    });
    dialogRef.afterClosed().subscribe(() => this.loadWarehousesPage());
  }

  openSureDialog() {
    const dialogRef = this.dialog.open(SureDialogComponent, {
      data: {
        id: this.id,
        warehouseAddress: this.warehouseAddress,
        warehouseLength: this.warehouseLength,
        warehouseWidth: this.warehouseWidth,
        subjectButton: ''
      }
    });

    // dialogRef.afterClosed().pipe(
    //   debounceTime(150),
    //   distinctUntilChanged(),
    //   tap(() => this.loadWarehousesPage())).subscribe();
    dialogRef.afterClosed().subscribe(() => this.loadWarehousesPage());
  }

  loadWarehousesPage() {
    this.dataSource.loadWarehouses(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageSize,
      this.paginator.pageIndex
    );
  }

  createWarehouse() {
    if (this.auth) {
      this.id = 0;
      this.warehouseAddress = '';
      this.warehouseLength = 0;
      this.warehouseWidth = 0;
      this.openDialog();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/warehouses/1');
  }
}

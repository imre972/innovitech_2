import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {MatDialogModule} from '@angular/material/dialog';
import {HttpErrorHandler} from '../http-error-handler.service';
import {WarehousesComponent} from './warehouses.component';

describe('WarehousesComponent', () => {
  let component: WarehousesComponent;
  let fixture: ComponentFixture<WarehousesComponent>;

  beforeEach(async(() => {
    const mockErrorHandler = jasmine.createSpyObj(['createHandleError']);

    TestBed.configureTestingModule({
      declarations: [WarehousesComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        {provide: HttpErrorHandler, useValue: mockErrorHandler}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

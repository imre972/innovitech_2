import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {MatDialogModule} from '@angular/material/dialog';
import {HttpErrorHandler} from '../http-error-handler.service';
import {SubjectsComponent} from './subjects.component';

describe('SubjectsComponent', () => {
  let component: SubjectsComponent;
  let fixture: ComponentFixture<SubjectsComponent>;

  beforeEach(async(() => {
    const mockErrorHandler = jasmine.createSpyObj(['createHandleError']);

    TestBed.configureTestingModule({
      declarations: [SubjectsComponent],
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
    fixture = TestBed.createComponent(SubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

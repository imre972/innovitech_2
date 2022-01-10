import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from "@angular/router/testing";

import {AuthService} from '../services/auth.service';
import {HeaderComponent} from './header.component';

class MockAuthService extends AuthService {
  public get userValue(): boolean {
    return true;
  }
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [{service, useClass: MockAuthService}]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goAuth() if click login button', fakeAsync(() => {
    spyOn(component, 'goAuth');

    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[0];
    button.click();
    tick();
    expect(component.goAuth).toHaveBeenCalled();

  }));

  it('should call goSubjects() if click subject button', fakeAsync(() => {
    spyOn(component, 'goSubjects');

    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[1];
    button.click();
    tick();
    expect(component.goSubjects).toHaveBeenCalled();

  }));

  it('should call goWarehouses() if click warehouse button', fakeAsync(() => {
    spyOn(component, 'goWarehouses');

    let button = fixture.debugElement.nativeElement.querySelectorAll('button')[2];
    button.click();
    tick();
    expect(component.goWarehouses).toHaveBeenCalled();

  }));

});

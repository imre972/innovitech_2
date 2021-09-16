import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  HttpClientModule,
  HttpClientXsrfModule
} from '@angular/common/http';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

import {RequestCache, RequestCacheWithMap} from './request-cache.service';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpErrorHandler} from './http-error-handler.service';
import {MessageService} from './message.service';
import {MessagesComponent} from './messages/messages.component';
import {AuthService} from './services/auth.service';
import {SubjectsService} from './services/subjects.service';

import {MatSliderModule} from '@angular/material/slider';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import {HeaderComponent} from './header/header.component';
import {SubjectsComponent} from './subjects/subjects.component';
import {WarehousesComponent} from './warehouses/warehouses.component';
import {AuthComponent} from './auth/auth.component';

import {httpInterceptorProviders} from './http-interceptors/index';
import {SubjectResolver} from "./services/subject.resolver";

import {ContextMenuComponent} from './modals/context-menu.component';
import {SubjectCreatorDialog} from './modals/subject-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SubjectsComponent,
    WarehousesComponent,
    AuthComponent,
    MessagesComponent,
    ContextMenuComponent,
    SubjectCreatorDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
      put204: false        // return entity after PUT/update
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    DragDropModule,
    CdkTableModule,
    CdkTreeModule
  ],
  providers: [
    MessageService,
    AuthService,
    SubjectsService,
    SubjectResolver,
    HttpErrorHandler,
    {provide: RequestCache, useClass: RequestCacheWithMap},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

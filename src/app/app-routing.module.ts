import {NgModule} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {AuthComponent} from './auth/auth.component';
import {SubjectsComponent} from './subjects/subjects.component';
import {WarehousesComponent} from './warehouses/warehouses.component';
import {SubjectResolver} from './services/subject.resolver';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'},
  {path: 'auth', component: AuthComponent},
  {
    path: 'subjects/:id',
    component: SubjectsComponent,
    resolve: {subject: SubjectResolver},
    canActivate: [AuthGuard]
  },
  {
    path: 'warehouses',
    component: WarehousesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

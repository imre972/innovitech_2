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
  {path: '', pathMatch: 'full', redirectTo: 'subjects/:id'},
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard]},
  {
    path: 'subjects/:id',
    component: SubjectsComponent,
    resolve: {subject: SubjectResolver}
  },
  {
    path: 'warehouses',
    component: WarehousesComponent
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

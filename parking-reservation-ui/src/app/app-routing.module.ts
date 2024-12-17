import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';

const routes: Routes = [
  { path: '', component: ReservationListComponent },
  { path: 'add', component: ReservationFormComponent },
  { path: 'edit/:id', component: ReservationFormComponent },
  { path: 'reservation-details/:id', component: ReservationDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

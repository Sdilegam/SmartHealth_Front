import { Routes } from '@angular/router';
import {DoctorListComponent} from './pages/doctors/doctor-list/doctor-list.component';
import {DoctorAppointmentComponent} from './pages/doctors/doctor-appointment/doctor-appointment.component';

export const routes: Routes = [
  { path: 'doctor/index', component: DoctorListComponent },
  { path: 'doctor/:id', component: DoctorAppointmentComponent }

];

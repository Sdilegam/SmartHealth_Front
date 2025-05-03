import { Routes } from '@angular/router';
import {DoctorListComponent} from './pages/doctors/doctor-list/doctor-list.component';
import {DoctorAppointmentComponent} from './pages/doctors/doctor-appointment/doctor-appointment.component';
import {AppointmentsListComponent} from './pages/appointments/appointments-list/appointments-list.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doctor/index', component: DoctorListComponent },
  { path: 'doctor/:id', component: DoctorAppointmentComponent },
  { path: 'appointment/:id', component: AppointmentsListComponent },
  { path: 'login', component: LoginComponent },
];

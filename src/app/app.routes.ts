import { Routes } from '@angular/router';
import {DoctorListComponent} from './pages/doctors/doctor-list/doctor-list.component';
import {DoctorAppointmentComponent} from './pages/doctors/doctor-appointment/doctor-appointment.component';
import {AppointmentsListComponent} from './pages/appointments/appointments-list/appointments-list.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {AppointmentDetailsComponent} from './pages/appointments/appointment-details/appointment-details.component';
import {patientGuard} from './guards/patient.guard';
import {authenticatedGuard} from './guards/authenticatedGuard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doctor/index', component: DoctorListComponent },
  { path: 'doctor/:id', component: DoctorAppointmentComponent, canActivate: [patientGuard] },
  { path: 'appointments/index', component: AppointmentsListComponent, canActivate: [authenticatedGuard] },
  { path: 'appointments/:appointmentID', component: AppointmentDetailsComponent, canActivate: [authenticatedGuard] },
  { path: 'login', component: LoginComponent },
];

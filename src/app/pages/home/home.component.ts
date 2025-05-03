import { Component, inject } from '@angular/core';
import {SessionService} from '../../services/session.service';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {AppointmentService} from '../../services/appointment.service';
import {AppointmentList_ViewModel} from '../../models/Appointment/AppointmentList_ViewModel';
import {AppointmentListItemDTOToViewModel} from '../../mappers/AppointmentMappers';
import {DatePipe} from '@angular/common';
import {PatientUserVM} from '../../models/Patient/PatientUserVM';
import {PatientService} from '../../services/patient.service';

@Component({
  selector: 'app-home',
  imports: [
    Card,
    Button,
    RouterLink,
    DatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sessionService = inject(SessionService);
  appointmentService = inject(AppointmentService);
  patientService = inject(PatientService);

  userInfo!:PatientUserVM;
  userName:string = this.sessionService.session().name;
  userId:number = this.sessionService.session().id;
  appointmentList:Array<AppointmentList_ViewModel> = [];

  constructor() {
    this.appointmentService.getAppointments(this.userId).subscribe(appointments=>{if (appointments) this.appointmentList = appointments.map(a=>AppointmentListItemDTOToViewModel(a))})
    this.patientService.getUserInfo().subscribe(user=>{this.userInfo = user})
  }

}

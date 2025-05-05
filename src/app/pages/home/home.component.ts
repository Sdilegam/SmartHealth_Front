import { Component, inject } from '@angular/core';
import {SessionService} from '../../services/session.service';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {AppointmentService} from '../../services/appointment.service';
import {AppointmentList_ViewModel} from '../../models/Appointment/AppointmentList_ViewModel';
import {AppointmentListItemDTOToViewModel} from '../../mappers/AppointmentMappers';
import {DatePipe} from '@angular/common';
import {UserVM} from '../../models/auth/UserVM';
import {PatientService} from '../../services/patient.service';
import {DoctorService} from '../../services/doctor.service';

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
  doctorService = inject(DoctorService);

  userInfo!:UserVM;
  userName:string = this.sessionService.session().name;
  userId:number = this.sessionService.session().id;
  appointmentList:Array<AppointmentList_ViewModel> = [];

  constructor() {
    if (this.sessionService.session().token){
    this.appointmentService.getAppointments().subscribe(appointments=>{if (appointments) this.appointmentList = appointments.map(a=>AppointmentListItemDTOToViewModel(a))})
      if (this.sessionService.session().role == "Patient"){
        this.patientService.getUserInfo().subscribe(user=>{this.userInfo = user})
      }
      else{
        this.doctorService.getUserInfo().subscribe(user=>{this.userInfo = user})
      }
    }
  }

}

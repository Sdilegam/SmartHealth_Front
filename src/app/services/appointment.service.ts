import {HttpClient} from '@angular/common/http';
import {DoctorAvailability} from '../models/DoctorAvailability/doctor-availability.DTO';
import {environment} from '../../environments/environment';
import {NewAppointmentDTO} from '../models/Appointment/new-appointment-dto';
import {inject, Injectable} from '@angular/core';
import {AppointmentList_DTO} from '../models/Appointment/AppointmentList_DTO';
import {AppointmentDetails_DTO} from '../models/Appointment/AppointmentDetails_DTO';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  httpClient = inject(HttpClient);
  constructor() { }

  getAppointments() {
    return (this.httpClient.get<Array<AppointmentList_DTO>>(environment.baseApiUrl + `/appointment`))
  }
  NewAppointment(doctorID:number, newAppointment:NewAppointmentDTO){
    return this.httpClient.post<NewAppointmentDTO>(environment.baseApiUrl + `/appointment/${doctorID}/newAppointment`, newAppointment)
  }
  cancelAppointment(appointmentID:number) {
    return this.httpClient.delete(environment.baseApiUrl + `/appointment/${appointmentID}/cancel`);
  }

  getAppointmentDetails(appointmentID:number) {
    return (this.httpClient.get<AppointmentDetails_DTO>(environment.baseApiUrl + `/appointment/${appointmentID}`));
  }
}

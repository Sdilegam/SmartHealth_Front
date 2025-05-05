import {AppointmentType} from '../../enum/appointment-type.enum';
import {AppointmentStatus} from '../../enum/appointment-status.enum';

export interface AppointmentList_DTO{
  appointmentID:number,
  startDate:string,
  endDate:string,
  type:AppointmentType,
  status:AppointmentStatus,
  doctor:{
    doctorID:number,
    name:string,
  }
  patient:{
    patientID:number,
    name:string,
}
}

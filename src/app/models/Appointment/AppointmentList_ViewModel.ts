import {AppointmentType} from '../../enum/appointment-type.enum';
import {AppointmentStatus} from '../../enum/appointment-status.enum';

export type AppointmentList_ViewModel ={
  AppointmentID:number,
  StartDate:Date,
  EndDate:Date,
  Type:AppointmentType,
  Status:AppointmentStatus,
  Doctor:{
    DoctorID:number,
    Name:string,
  }
  Patient:{
    PatientID:number,
    Name:string,
  }
  Severtity:"success" | "secondary" | "info" | "warn" | "danger" | "contrast"| undefined;
}

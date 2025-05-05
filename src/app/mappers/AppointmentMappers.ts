import {AppointmentList_DTO} from '../models/Appointment/AppointmentList_DTO';
import {AppointmentList_ViewModel} from '../models/Appointment/AppointmentList_ViewModel';
import {AppointmentStatus} from '../enum/appointment-status.enum';
import {AppointmentDetails_DTO} from '../models/Appointment/AppointmentDetails_DTO';
import {AppointmentDetails_ViewModel} from '../models/Appointment/AppointmentDetails_ViewModel';

export function AppointmentListItemDTOToViewModel(dto: AppointmentList_DTO): AppointmentList_ViewModel {
  return {
    AppointmentID: dto.appointmentID,
    StartDate: new Date(dto.startDate),
    EndDate: new Date(dto.endDate),
    Status: dto.status,
    Type: dto.type,
    Doctor: {
      DoctorID: dto.doctor.doctorID,
      Name: dto.doctor.name
    },
    Patient: {
      PatientID: dto.patient.patientID,
      Name: dto.patient.name
    },
    Severtity: (dto.status == AppointmentStatus.Completed) ? "success" : dto.status == AppointmentStatus.Cancelled ? "danger" : dto.status == AppointmentStatus.Scheduled ? "info" : undefined
  }
}

export function AppointmentDetailsDTOToViewModel(dto: AppointmentDetails_DTO): AppointmentDetails_ViewModel {
  return {
    appointmentID: dto.appointmentID,
    doctor: dto.doctor,
    patient: dto.patient,
    type: dto.type,
    status: dto.status,
    creationDate: new Date(dto.creationDate),
    startDate: new Date(dto.startDate),
    endDate: new Date(dto.endDate),
    realStartTime: new Date(dto.realStartTime),
    realEndTime: new Date(dto.realEndTime),
    doctorsNotes: dto.doctorsNotes,
    patientsNotes: dto.patientsNotes
  }
}

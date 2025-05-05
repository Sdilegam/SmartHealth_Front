import {AppointmentType} from '../../enum/appointment-type.enum';
import {AppointmentStatus} from '../../enum/appointment-status.enum';

export interface AppointmentDetails_ViewModel {
  appointmentID: number
  startDate: Date,
  endDate: Date,
  type: AppointmentType
  status: AppointmentStatus
  doctor: {
    doctorID: number
    name: string,
  }
  patient: {
    patientID: number
    name: string
  }
  creationDate: Date
  realStartTime: Date
  realEndTime: Date
  patientsNotes: string
  doctorsNotes: string
}

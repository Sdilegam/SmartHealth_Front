import {AppointmentType} from '../../enum/appointment-type.enum';

export interface NewAppointmentDTO {
  start: Date,
  duration: number,
  appointmentType: AppointmentType
}

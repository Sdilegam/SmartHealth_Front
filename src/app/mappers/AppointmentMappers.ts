import {AppointmentList_DTO} from '../models/Appointment/AppointmentList_DTO';
import {AppointmentList_ViewModel} from '../models/Appointment/AppointmentList_ViewModel';
import {AppointmentStatus} from '../enum/appointment-status.enum';

export function AppointmentListItemDTOToViewModel(dto:AppointmentList_DTO):AppointmentList_ViewModel {
  return {
    AppointmentID : dto.appointmentID,
    StartDate: new Date(dto.startDate),
    EndDate: new Date(dto.endDate),
    Status: dto.status,
    Type: dto.type,
    Doctor: {DoctorID : dto.doctor.doctorID,
    Name : dto.doctor.name},
    Severtity: (dto.status== AppointmentStatus.Completed) ? "success": dto.status == AppointmentStatus.Cancelled? "danger": dto.status == AppointmentStatus.Scheduled? "info": undefined
  }
}

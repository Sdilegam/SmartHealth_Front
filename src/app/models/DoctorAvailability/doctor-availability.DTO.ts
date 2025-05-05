import {WorkingHours} from './working-hours.DTO';
import {SlotsTakenDTO} from './slots-taken-dto';

export interface DoctorAvailability {
  doctorName:string,
  workingHours:WorkingHours[];
  slotsTaken:SlotsTakenDTO[];
}

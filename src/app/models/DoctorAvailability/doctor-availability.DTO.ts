import {WorkingHours} from './working-hours.DTO';
import {SlotsTakenDTO} from './slots-taken-dto';

export interface DoctorAvailability {
  workingHours:WorkingHours[];
  slotsTaken:SlotsTakenDTO[];
}

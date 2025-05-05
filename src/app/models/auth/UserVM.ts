import {WorkingHours} from '../DoctorAvailability/working-hours.DTO';
import {SlotsTakenDTO} from '../DoctorAvailability/slots-taken-dto';
import { Gender } from '../../enum/gender.enum';
import {Address} from '../address.DTO';

export interface UserVM {
displayName:string;
firstName:string;
lastName:string;
gender: Gender
address: Address
email: string;
phoneNumber: string;
birthDate: string;
}

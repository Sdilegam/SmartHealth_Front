import {Address} from '../address.DTO';
import {DoctorSpeciality} from '../../enum/doctor-speciality';

export interface DoctorListItem {
  DoctorID: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: Address
  languageSpoken: number[]
  speciality: DoctorSpeciality
}

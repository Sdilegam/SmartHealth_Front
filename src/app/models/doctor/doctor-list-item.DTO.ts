import {Address} from '../address.DTO';

export interface DoctorListItem {
  DoctorID: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: Address
  languageSpoken: number[]
}

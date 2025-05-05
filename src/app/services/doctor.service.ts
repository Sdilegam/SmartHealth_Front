import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DoctorListItem} from '../models/doctor/doctor-list-item.DTO';
import {DoctorAvailability} from '../models/DoctorAvailability/doctor-availability.DTO';
import {UserVM} from '../models/auth/UserVM';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  httpClient = inject(HttpClient);

  constructor() { }

  getAllDoctors(){
    return this.httpClient.get<DoctorListItem[]>(environment.baseApiUrl + '/doctor/index')
  }

  getDoctorAvailability(id:number, currentRange: { start: Date, end: Date }){
    return this.httpClient.post<DoctorAvailability>(environment.baseApiUrl + `/doctor/${id}/availability`, currentRange)
  }

    getUserInfo = ()=> this.httpClient.get<UserVM>(environment.baseApiUrl + `/doctor`)
}

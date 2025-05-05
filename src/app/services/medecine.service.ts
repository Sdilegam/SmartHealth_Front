import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MedecineListItemDTO} from '../models/medecine/medecine-list-item.DTO';
import {environment} from '../../environments/environment';
import {NewMedecineDTO} from '../models/medecine/new-medecine.DTO';

@Injectable({
  providedIn: 'root'
})
export class MedecineService {
  httpClient=inject(HttpClient);
  constructor() { }

  newMedecine(appointmentID:number, medecine:any){
    return this.httpClient.post<MedecineListItemDTO>(environment.baseApiUrl + "/medecine/from-appointment/"+appointmentID, medecine)
  }
  getMedecineFromAppointment(appointmentID:number){
    return this.httpClient.get<MedecineListItemDTO[]>(environment.baseApiUrl + "/medecine/from-appointment/"+appointmentID)
  }
}

import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PatientUserVM} from '../models/Patient/PatientUserVM';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  httpClient = inject(HttpClient);
  constructor() { }

  getUserInfo = ()=> this.httpClient.get<PatientUserVM>(environment.baseApiUrl + `/patient`)
}

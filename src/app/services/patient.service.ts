import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserVM} from '../models/auth/UserVM';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  httpClient = inject(HttpClient);
  constructor() { }

  getUserInfo = ()=> this.httpClient.get<UserVM>(environment.baseApiUrl + `/patient`)
}

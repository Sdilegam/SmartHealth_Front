import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {SessionService} from './services/session.service';
import {usePreset} from '@primeng/themes';
import {PatientPreset} from './primePresets/PatientPreset';
import {DoctorPreset} from './primePresets/DoctorPreset';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, SideNavComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SmartHealth_Front';
  sessionService = inject(SessionService);
  sideBarOpened = false;
  constructor() {
    if(this.sessionService.session().role == "Doctor") {
      usePreset(DoctorPreset)
    }
    else{
      usePreset(PatientPreset);
    }
  }
}

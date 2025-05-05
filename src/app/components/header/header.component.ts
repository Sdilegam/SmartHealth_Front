import {Component, inject, Input, model} from '@angular/core';
import {Button} from 'primeng/button';
import {SessionService} from '../../services/session.service';
import {RouterLink} from '@angular/router';
import {Menu} from 'primeng/menu';
import {MenuItem, MenuItemCommandEvent} from 'primeng/api';
import {usePreset} from '@primeng/themes';
import {PatientPreset} from '../../primePresets/PatientPreset';

@Component({
  selector: 'app-header',
  imports: [
    Button,
    RouterLink,
    Menu
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  sideBarOpened = model<boolean>(false);
  sessionService = inject(SessionService);

  items:MenuItem[]= [
      {
        label: 'Mes rendez-vous',
        icon: 'pi pi-calendar',
        route: 'appointment/'+this.sessionService.session().id
      },
      {
        label: 'Se déconnecter',
        icon: 'pi pi-sign-out',
        command: ()=> {
          this.sessionService.clear()
          usePreset(PatientPreset);
        }
      }
  ];

  toggleSide(){
    this.sideBarOpened.update(variable=> variable = !variable);
  }

  protected readonly SessionService = SessionService;
}

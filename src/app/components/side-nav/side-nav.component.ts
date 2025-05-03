import {Component, inject, Input, input} from '@angular/core';

import { routes } from '../../app.routes';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-side-nav',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  @Input()
  sideBarOpenend:boolean = false
  sessionService = inject(SessionService);

  protected readonly routes = routes;
}

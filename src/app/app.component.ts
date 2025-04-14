import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ConfirmDialog, SideNavComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SmartHealth_Front';
  sideBarOpened = false;
}

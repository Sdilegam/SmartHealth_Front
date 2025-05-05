import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SessionService} from '../services/session.service';

export const patientGuard: CanActivateFn = (route, state) => {
  if (inject(SessionService).session().role == "Patient"){
    return true;
  }

  const router = inject(Router);
  router.navigate(['/']);
  return false;
};

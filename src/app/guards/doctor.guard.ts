import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SessionService} from '../services/session.service';

export const DoctorGuard: CanActivateFn = (route, state) => {
  if (inject(SessionService).session().role == "Doctor"){
    return true;
  }

  const router = inject(Router);
  router.navigate(['/']);
  return false;
};

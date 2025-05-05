import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SessionService} from '../../../../../DigitalCity2025-IntermediateLabo/IntermediateLabo-Frontend/src/app/services/session.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  if (inject(SessionService).session().token){
    return true;
  }

  const router = inject(Router);
  router.navigate(['login'], { queryParams: {redirection:route.url.join('/')}});
  return false;
};

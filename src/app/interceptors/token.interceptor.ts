import {HttpInterceptorFn} from '@angular/common/http';
import {SessionService} from '../services/session.service';
import {inject} from '@angular/core';
import {catchError, from, mergeMap, of, switchMap, tap} from 'rxjs';
import {environment} from '../../environments/environment';
// import * as net from 'node:net';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionService = inject(SessionService);

  let token = sessionService.session().token
  if (!token) {
    return next(req);
  }
  if (sessionService.session().expires < new Date())
  {
    return from(fetch(environment.baseApiUrl + '/refreshToken?token=' + token).then(res => res.json()))
      .pipe(tap(({token}) => sessionService.start(token)), catchError(() =>
        {
          sessionService.clear();
          return of()
        }),
        switchMap(({token}) =>
        {
          const clone = req.clone({setHeaders: { Authorization: 'Bearer ' + token} });
          return next(clone);
        })
      );
  }
  else
  {
    const clone = req.clone({setHeaders: {Authorization: 'Bearer ' + sessionService.session().token}});
    return next(clone);
  }
};

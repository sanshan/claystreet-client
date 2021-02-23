import {Injectable} from '@angular/core';
import {GoogleApiService, GoogleAuthService} from 'ng-gapi';
import {filter, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static readonly SESSION_STORAGE_KEY: string = 'accessToken';

  constructor(
    private googleAuthService: GoogleAuthService,
    private gapiService: GoogleApiService
  ) {
  }

  public getToken(): string | null {
    const token: string | null = sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set , authentication required');
    }
    return sessionStorage.getItem(UserService.SESSION_STORAGE_KEY);
  }

  public setToken(auth: gapi.auth2.GoogleAuth): void {
    const access_token = auth?.currentUser?.get()?.getAuthResponse()?.access_token;
    if (access_token) {
      sessionStorage.setItem(
        UserService.SESSION_STORAGE_KEY, access_token
      );
    }
  }

  public signIn(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
      auth.signIn().then(undefined);
    });
  }

  public auth(): Observable<gapi.auth2.GoogleAuth> {
    return this.gapiService.onLoad().pipe(
      filter(a => a), switchMap(() => this.googleAuthService.getAuth())
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

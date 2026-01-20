import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ApiMockService } from './api-mock.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private apiMock: ApiMockService,
    private storage: StorageService,
  ) {}

  login(email: string, pass: string): Observable<boolean> {
    return this.apiMock.login(email, pass).pipe(
      tap((response) => {
        this.storage.saveToken(response.token);
        this.storage.saveUserEmail(email);
      }),
      switchMap(() => of(true)),
    );
  }

  isLoggedIn(): boolean {
    return !!this.storage.getToken();
  }

  deleteAccount(): Observable<void> {
    const email = this.storage.getUserEmail();
    if (!email) return of(void 0);

    return this.apiMock.deleteAccount(email).pipe(
      tap(() => {
        this.logout();
      }),
    );
  }

  logout() {
    this.storage.clear();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FbAuthResponse, User } from 'src/app/shared/components/interfaces';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }
  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-exp-date')!);
    if (new Date > expDate) {
      this.logout();
      return ''
    }
    return localStorage.getItem('fb-token')!
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
   return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
     .pipe(
    tap(this.setToken)
  )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000);
      localStorage.setItem('fb-token', response.idToken!);
      localStorage.setItem('fb-exp-date', expDate.toString());
    } else {
      localStorage.clear()
    }
  }
}

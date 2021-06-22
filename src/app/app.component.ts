import { Component } from '@angular/core';
import { TokenStorageService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  showAdminBoard = false;
  usuario?: string;
  title = 'FisaPayAngular';

  constructor(private _tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this._tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this._tokenStorageService.getUser();
      this.usuario = user.username;
    }
  }

  logout(): void {
    this._tokenStorageService.signOut();
    window.location.href = "/login";
  }
}

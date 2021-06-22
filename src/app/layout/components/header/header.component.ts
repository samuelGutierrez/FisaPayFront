import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  usuario?: string;

  constructor(private _tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this._tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this._tokenService.getUser();
      this.usuario = user.nameUser;
    }
  }
}

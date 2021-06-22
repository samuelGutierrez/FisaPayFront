import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn = false;
  usuario?: string;
  news: Array<string> = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "Lorem ipsum dolor sit amet, consectetur",
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet, consectetur"]
  constructor(private _tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this._tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this._tokenService.getUser();

      this.usuario = user.nameUser;
    }
  }

}

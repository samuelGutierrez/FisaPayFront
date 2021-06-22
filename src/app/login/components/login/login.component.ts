import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, NotificationService, TokenStorageService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //#region  Creacion formulario para realizar el login
  form: any = {
    usuario: null,
    password: null,
  };
  //#endregion

  //#region Parametros para poder realizar el login
  intentos = 0;
  isLoggedIn = false;
  isLoginFailed = false;
  sms = '';
  errorMessage = '';
  usuarioValidacion = '';
  //#endregion

  constructor(
    private _authService: AuthService,
    private _tokeStorage: TokenStorageService,
    private _router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    if (this._tokeStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { usuario, password } = this.form;
    if (this.usuarioValidacion === '' || this.usuarioValidacion === usuario) {
      this._authService.login(usuario, password, this.intentos).subscribe(
        data => {
          this.showToasterSuccess('Inicio de sesión exitoso.', 'Bienvenido');
          this.sms = 'Bienvenido'
          this._tokeStorage.saveToken(data.token);
          this._tokeStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
          this.intentos = 0;
        },
        err => {
          this.showToasterError(err.error.message, "Error");
          this.sms = err.error.message;
          this.intentos++;
        }
      );
      this.usuarioValidacion = usuario;
    } else if (this.usuarioValidacion !== usuario) {
      this.intentos = 0;
      this.usuarioValidacion = usuario;
      this._authService.login(usuario, password, this.intentos).subscribe(
        data => {
          this.showToasterSuccess('Inicio de session exitoso.', 'Bienvenido');
          this._tokeStorage.saveToken(data.token);
          this._tokeStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
          this.intentos = 0;
        },
        err => {
          this.showToasterError(err.error.message, "Error");
          this.intentos++;
        }
      );
    }
  }

  reloadPage(): void {
    this._router.navigate(['/dashboard']);
  }

  //#region Notificaciones
  showToasterSuccess(sms, title) {
    this.notifyService.showSuccess(sms, title)
  }

  showToasterError(sms, title) {
    this.notifyService.showError(sms, title)
  }
  //#endregion
}

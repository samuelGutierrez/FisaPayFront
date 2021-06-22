import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrarUsuario } from 'src/app/core/models';
import { NotificationService, UsuarioService } from 'src/app/core/services';

@Component({
  selector: 'app-registrarusuario',
  templateUrl: './registrarusuario.component.html',
  styleUrls: ['./registrarusuario.component.css']
})
export class RegistrarusuarioComponent implements OnInit {

  //#region Variables para poder crear un usuario
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  //#endregion

  constructor(
    private _usuarioService: UsuarioService,
    private _formBuilder: FormBuilder,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  // Formulario para crear un usuario nuevo 
  formRegister = this._formBuilder.group({
    cedula: ['', Validators.required],
    usuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
    passwordHash: ['', [Validators.minLength(6)]],
    activo: true
  });

  onSubmit() {
    if (!this.formRegister.valid) {
      this.formRegister.markAllAsTouched();
      this.showToasterWarning('Por favor verifique que toda la información del usuario se encuentre correctamente diligenciada', "Mensaje:")
      return;
    }

    const registrarUsuario: RegistrarUsuario = {
      cedulaEmpleado: this.formRegister.get('cedula').value,
      usuario: this.formRegister.get('usuario').value.toString(),
      passwordHash: this.formRegister.get('passwordHash').value,
      activo: true
    }

    this._usuarioService.registrarUsuario(registrarUsuario).subscribe(data => {
      this.showToasterSuccess("¡El usuario se creo con exito!", "Mensaje:")
      this.formRegister.reset();
    },
      err => {
        this.showToasterWarning(err.error.message, "Mensaje:")
      });
  }

  limpiar() {
    this.formRegister.controls.cedula.setValue("");
    this.formRegister.controls.usuario.setValue("");
    this.formRegister.controls.passwordHash.setValue("");
    this.isSignUpFailed = false;
    this.isSuccessful = false;
  }

  //#region notificacion
  showToasterSuccess(sms, title) {
    this.notifyService.showSuccess(sms, title)
  }

  showToasterWarning(sms, title) {
    this.notifyService.showWarning(sms, title)
  }
  //#endregion
}

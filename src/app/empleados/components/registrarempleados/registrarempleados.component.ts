import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrarEmpleado } from 'src/app/core/models';
import { EmpleadoService, NotificationService } from 'src/app/core/services';

@Component({
  selector: 'app-registrarempleados',
  templateUrl: './registrarempleados.component.html',
  styleUrls: ['./registrarempleados.component.css']
})
export class RegistrarempleadosComponent implements OnInit {

  vacunado: boolean = false;

  constructor(
    private _empleadoService: EmpleadoService,
    private _formBuilder: FormBuilder,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  // Formulario para crear un empleado nuevo 
  formRegisterEmpleado = this._formBuilder.group({
    cedula: ['', Validators.required],
    nombres: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    sexo: [''],
    fechaNacimiento: ['', Validators.required],
    salario: ['', Validators.required],
    vacunaCovid: ['',],
    activo: true
  });

  onSubmit() {
    if (!this.formRegisterEmpleado.valid) {
      this.formRegisterEmpleado.markAllAsTouched();
      this.showToasterWarning('Por favor verifique que toda la información del empleado se encuentre correctamente diligenciada', "Mensaje:")
      return;
    }

    let vacuna = this.formRegisterEmpleado.get('vacunaCovid').value;

    if (vacuna == "si") {
      this.vacunado = true;
    } else {
      this.vacunado = false;
    }

    let edad = getEdad(this.formRegisterEmpleado.get('fechaNacimiento').value);

    if (edad < 18) {
      this.showToasterWarning("No puede registrar menores de edad", "Mensaje:")
    } else {

      const registrarEmpleado: RegistrarEmpleado = {
        cedula: this.formRegisterEmpleado.get('cedula').value,
        nombres: this.formRegisterEmpleado.get('nombres').value.toString(),
        sexo: this.formRegisterEmpleado.get('sexo').value,
        fechaNacimiento: this.formRegisterEmpleado.get('fechaNacimiento').value,
        salario: this.formRegisterEmpleado.get('salario').value,
        vacunaCovid: this.vacunado,
        activo: true
      }


      this._empleadoService.registrarEmpleado(registrarEmpleado).subscribe(
        data => {
          this.showToasterSuccess("¡El empleado se creo con exito!", "Mensaje:")
          this.formRegisterEmpleado.reset();
        },
        err => {
          this.showToasterWarning("Hubo un error", "Mensaje:")
        });

    }
  }

  //#region notificacion
  showToasterSuccess(sms, title) {
    this.notifyService.showSuccess(sms, title)
  }

  showToasterError(sms, title) {
    this.notifyService.showError(sms, title)
  }

  showToasterWarning(sms, title) {
    this.notifyService.showWarning(sms, title)
  }
  //#endregion
}

function getEdad(dateString) {
  let hoy = new Date()
  let fechaNacimiento = new Date(dateString)
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
  let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
  ) {
    edad--
  }
  return edad
}

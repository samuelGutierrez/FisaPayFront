import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActualizarEmpleados, ListaEmpleados } from 'src/app/core/models';
import { EmpleadoService, NotificationService } from 'src/app/core/services';

@Component({
  selector: 'app-actualizar-empleados',
  templateUrl: './actualizar-empleados.component.html',
  styleUrls: ['./actualizar-empleados.component.css']
})
export class ActualizarEmpleadosComponent implements OnInit {

  @Input() IdEmpleado;

  vacunado: boolean = false;
  listEmpleados : ListaEmpleados;

  constructor(
    private _empleadoService: EmpleadoService,
    private _formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._empleadoService.getListaEmpleados().subscribe(
      data => {
        this.listEmpleados = data as ListaEmpleados;
      }
    );
  }

  //Formulario para actualizar un empleado
  formUpdateEmpleado = this._formBuilder.group({
    nombres: ['',],
    sexo: [''],
    salario: ['',],
    vacunaCovid: ['',],
  });

  onSubmit() {
    let vacuna = this.formUpdateEmpleado.get('vacunaCovid').value;

    if (vacuna == "si") {
      this.vacunado = true;
    } else {
      this.vacunado = false;
    }

    const actualizarEmpleado: ActualizarEmpleados = {
      nombres: this.formUpdateEmpleado.get('nombres').value.toString(),
      sexo: this.formUpdateEmpleado.get('sexo').value,
      salario: this.formUpdateEmpleado.get('salario').value,
      vacunaCovid: this.vacunado,
    }

    this._empleadoService.actualizarEmpleado(actualizarEmpleado, this.IdEmpleado).subscribe(
      data => {
        this.showToasterSuccess("¡El empleado se actualizo con exito!", "Mensaje:")
        this.refresh();
      }, err => {
        this.showToasterWarning("Hubo un error", "Mensaje:");
        this.refresh();
      }
    )
  }

  refresh() {
    this._router.navigateByUrl('empleados/actualizarEmpleados', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/empleados/listaEmpleados']);
    });
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

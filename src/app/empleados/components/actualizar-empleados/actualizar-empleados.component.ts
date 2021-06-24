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
  listEmpleados: ListaEmpleados;
  nombre: string;
  sexo: string;
  salario: number;
  vacunaCovid: string;

  constructor(
    private _empleadoService: EmpleadoService,
    private _formBuilder: FormBuilder,
    private notifyService: NotificationService,
    private _router: Router
  ) { }

  //Formulario para actualizar un empleado
  formUpdateEmpleado = this._formBuilder.group({
    nombres: [],
    sexo: [''],
    salario: [''],
    vacunaCovid: [''],
  });

  ngOnInit(): void {
    this._empleadoService.getbyId(this.IdEmpleado).subscribe(
      data => {
        let listData = []
        listData.push(data);
        this.nombre = listData[0].nombres;
        this.sexo = listData[0].salario;
        this.salario = listData[0].salario;
        this.vacunaCovid = listData[0].vacunaCovid;

        this.formUpdateEmpleado.controls.nombres.setValue(this.nombre);
        this.formUpdateEmpleado.controls.sexo.setValue(this.sexo);
        this.formUpdateEmpleado.controls.salario.setValue(this.salario);
        this.formUpdateEmpleado.controls.vacunaCovid.setValue(this.vacunaCovid);
      }
    );
  }

  onSubmit() {
    let vacuna = this.formUpdateEmpleado.get('vacunaCovid').value;

    if (vacuna == "0") {
      this.vacunado = true;
    } else {
      this.vacunado = false;
    }

    const actualizarEmpleado: ActualizarEmpleados = {
      id: this.IdEmpleado,
      nombres: this.formUpdateEmpleado.get('nombres').value,
      sexo: this.formUpdateEmpleado.get('sexo').value,
      salario: this.formUpdateEmpleado.get('salario').value,
      vacunaCovid: this.vacunado,
    }

    this._empleadoService.actualizarEmpleado(actualizarEmpleado).subscribe(
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

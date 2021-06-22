import { NgModule } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";
import { SharedModule } from "../shared/shared.module";
import { ListaempleadosComponent } from './components/listaempleados/listaempleados.component';
import { RegistrarempleadosComponent } from './components/registrarempleados/registrarempleados.component';
import { EmpleadosRoutingModule } from "./empleados-routing.module";
import { ActualizarEmpleadosComponent } from './components/actualizar-empleados/actualizar-empleados.component';

@NgModule({
    declarations: [
        ListaempleadosComponent,
        RegistrarempleadosComponent,
        ActualizarEmpleadosComponent
    ],
    imports: [
        SharedModule,
        EmpleadosRoutingModule,
        AgGridModule.withComponents([]),
    ]
})
export class EmpleadosModule { }
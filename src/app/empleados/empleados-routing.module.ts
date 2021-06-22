import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActualizarEmpleadosComponent } from "./components/actualizar-empleados/actualizar-empleados.component";
import { ListaempleadosComponent } from "./components/listaempleados/listaempleados.component";
import { RegistrarempleadosComponent } from "./components/registrarempleados/registrarempleados.component";

const routes: Routes = [
    {
        path: 'listaEmpleados', component: ListaempleadosComponent
    },
    {
        path: 'registroEmpleados', component: RegistrarempleadosComponent
    },
    {
        path: 'actualizarEmpleados', component: ActualizarEmpleadosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
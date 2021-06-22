import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/helper";
import { ListaempleadosComponent } from "./components/listaempleados/listaempleados.component";
import { RegistrarempleadosComponent } from "./components/registrarempleados/registrarempleados.component";

const routes: Routes = [
    {
        path: 'listaEmpleados', component: ListaempleadosComponent
    },
    {
        path: 'registroEmpleados', component: RegistrarempleadosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
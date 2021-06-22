import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RegistrarusuarioComponent } from './components/registrarusuario/registrarusuario.component';
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { AgGridModule } from "ag-grid-angular";

@NgModule({
    declarations: [
        RegistrarusuarioComponent,
        ListaUsuariosComponent
    ],
    imports: [
        SharedModule,
        UsuariosRoutingModule,
        AgGridModule.withComponents([]),
    ]
})
export class UsuariosModule { }
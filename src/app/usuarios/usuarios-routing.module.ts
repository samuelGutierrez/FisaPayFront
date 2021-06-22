import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListaUsuariosComponent } from "./components/lista-usuarios/lista-usuarios.component";
import { RegistrarusuarioComponent } from "./components/registrarusuario/registrarusuario.component";

const routes: Routes = [
    {
        path: 'registroUsuario', component: RegistrarusuarioComponent
    },
    {
        path: 'listaUsuario', component: ListaUsuariosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsuariosRoutingModule { }
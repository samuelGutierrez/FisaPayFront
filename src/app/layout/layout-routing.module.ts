import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { FooterOnlyLayoutComponent } from "./components/footer-only-layout/footer-only-layout.component";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: MainLayoutComponent,
        children:[
            { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'usuarios', loadChildren: () => import('../usuarios/usuarios.module').then(m => m.UsuariosModule) },
            { path: 'empleados', loadChildren: () => import('../empleados/empleados.module').then(m => m.EmpleadosModule) },
        ]
    },
    {
        path: '',
        component: FooterOnlyLayoutComponent,
        children: [
            { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
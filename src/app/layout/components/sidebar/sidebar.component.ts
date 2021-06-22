import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  isLoggedIn = false;

  @ViewChild("collapsePagesAdmUsuarios") menuUsuarios: ElementRef;
  @ViewChild("collapsePagesAdmEmpleados") menuEmpleados: ElementRef;

  mostrarMenuAdminUsuario: boolean = false;
  mostrarMenuAdminEmpleados: boolean = false;

  constructor(
    private _tokenStorageService: TokenStorageService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this._tokenStorageService.getToken();
  }

  ngAfterViewInit() {
  }

  cerrarMenuAdmUsuarios() {
    if (this.menuUsuarios.nativeElement.ariaExpanded === "true") {
      this.mostrarMenuAdminUsuario = false;
    }
    else {
      this.mostrarMenuAdminUsuario = true;
      switch (this.mostrarMenuAdminUsuario) {
        case true:
          this.mostrarMenuAdminEmpleados = false;
          break;
      }
    }
  }

  cerrarMenuAdmEmpleados() {
    if (this.menuEmpleados.nativeElement.ariaExpanded === "true") {
      this.mostrarMenuAdminEmpleados = false;
    }
    else {
      this.mostrarMenuAdminEmpleados = true;
      switch (this.mostrarMenuAdminEmpleados) {
        case true:
          this.mostrarMenuAdminUsuario = false;
          break;
      }
    }
  }

  redirectToOption(option: string) {
    this._router.navigate([option]);

    switch (option) {
      case 'usuarios/registroUsuario':
        this.mostrarMenuAdminUsuario = false;
        break;
      case 'usuarios/listaUsuario':
        this.mostrarMenuAdminUsuario = false;
        break;
      case 'empleados/listaEmpleados':
        this.mostrarMenuAdminEmpleados = false;
        break;
      case 'empleados/registroEmpleados':
        this.mostrarMenuAdminEmpleados = false;
        break;
      default:
        break;
    }
  }

  logout(): void {
    this._tokenStorageService.signOut();
    this._router.navigate(['/login']);
  }
}

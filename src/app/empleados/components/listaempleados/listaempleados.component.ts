import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ListaEmpleados } from 'src/app/core/models';
import { EmpleadoService, NotificationService } from 'src/app/core/services';
import { AG_GRID_LOCALES } from 'src/app/shared/ag-grid-locale-es';

@Component({
  selector: 'app-listaempleados',
  templateUrl: './listaempleados.component.html',
  styleUrls: ['./listaempleados.component.css']
})
export class ListaempleadosComponent implements OnInit {

  // Castear el bit de si esta vacunado o no
  activeValueGetter = function (params: any) {
    const r = params.node.data[params.column.colId]
    return (r ? 'Si' : 'No');
  };

  //#region Cabecera agGrid
  cabecera = [
    { headerName: 'Cedula', field: "cedula", sortable: true, filter: true, width: 50, headerClass: "center-header-class", cellStyle: { textAlign: 'center' }, },
    { headerName: 'Nombre Completo', field: "nombreCompleto", sortable: true, filter: true, width: 100, headerClass: "center-header-class", cellStyle: { textAlign: 'center' }, },
    { headerName: 'Sexo', field: "sexo", sortable: true, filter: true, width: 40, headerClass: "center-header-class", cellStyle: { textAlign: 'center' }, },
    { headerName: 'Fecha Nacimiento', field: "fechaNacimiento", sortable: true, width: 95, filter: true, headerClass: "center-header-class", cellStyle: { textAlign: 'center' }, },
    {
      headerName: 'Edad a la Fecha', field: "edadActual", sortable: true, filter: true, width: 68, headerClass: "center-header-class", cellStyle: { textAlign: 'center' },
    },
    {
      headerName: 'Salario', field: "salario", sortable: true, filter: true, width: 50, headerClass: "center-header-class", cellStyle: { textAlign: 'center' },
    },
    {
      headerName: 'Vacuna Covid', field: "vacunaCovid", sortable: true, filter: true,
      width: 80, suppressSizeToFit: true,
      headerClass: "center-header-class", cellStyle: { textAlign: 'center' },
      valueGetter: this.activeValueGetter
    },
    {
      headerName: 'Acciones', field: 'Acciones', sortable: false, filter: false, cellRenderer: 'btnCellRenderAcciones',
      width: 40, suppressSizeToFit: true,
      headerClass: "center-header-class", cellStyle: { textAlign: 'center' },
      cellRendererParams: {
        onClick: this.onActionBtnClick.bind(this),
        label: 'Acciones'
      }
    },
  ];

  frameworkComponents = {
    btnCellRendererActualizar: BtnCellRendererActualizar,
    btnCellRenderEliminar: BtnCellRendererEliminar,
    btnCellRenderAcciones: AppBtnCellRendererAccionComponent
  };

  //#endregion

  //#region Variables para obtener el listado de empleados
  listEmpleados: ListaEmpleados[];
  empleados = [];
  rowData: any;
  gridApi: any;
  gridColumnApi: any;
  searchValue: any;
  overlayLoadingTemplate = "";
  overlayNoRowsTemplate = "";
  localText = AG_GRID_LOCALES.ES;
  
  IdEmpleado;
  isShow: Boolean = true;
  isShowUpdate: Boolean = false;
  //#endregion

  constructor(
    private _empleadoService: EmpleadoService,
    private notifyService: NotificationService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._empleadoService.getListaEmpleados().subscribe(
      data => {
        this.listEmpleados = data as ListaEmpleados[];
      }
    );
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params: any): void {
    this.gridColumnApi.autoSizeAllColumns();
    params.api.sizeColumnsToFit();
  }

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  //#region Accion Botones
  onClickActualizar(id) {
    this.IdEmpleado = id;
    this.isShow = false;
    this.isShowUpdate = true;
  }

  onClickEliminar(id) {
    this._empleadoService.eliminarEmpleado(id).subscribe(
      data => {
        this.showToasterSuccess("Empleado eliminado con exito", 'Mensaje:');
      }
    );
  }
  //#endregion

  //#region Renderizar botones
  onBtnClick1(e) {
    this.onClickActualizar(e.rowData.id);
  }

  onBtnClick2(e) {
    this.onClickEliminar(e.rowData.id);
  }
  onActionBtnClick(e) {
    if (e.event.target.id === 'update-action') { this.onClickActualizar(e.rowData.id); }
    if (e.event.target.id === 'delete-action') { this.onClickEliminar(e.rowData.id); }
  }

  refresh() {
    this._router.navigateByUrl('empleados/listaEmpleados', { skipLocationChange: true }).then(() => {
      this._router.navigate(['empleados/listaEmpleados']);
    });
  }

  //#endregion

  //#region  ShowToaster
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

@Component({
  selector: 'btn-cell-renderer-actualizar',
  template: `
    <a class="nav-link" placement="bottom"
        ngbTooltip="Actualizar empleado" (click)="onClick($event)">
        <i class="bi bi-pencil-square"></i>
    </a>
  `
})
export class BtnCellRendererActualizar implements ICellRendererAngularComp {
  params;

  agInit(params): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      };
      this.params.onClick(params);

    }
  }
}

@Component({
  selector: 'btn-cell-renderer-eliminar',
  template: `
    <a class="nav-link" placement="bottom"
        ngbTooltip="Eliminar empleado" (click)="onClick($event)">
        <i class="bi bi-trash"></i>
    </a>
  `
})
export class BtnCellRendererEliminar implements ICellRendererAngularComp {
  params;

  agInit(params): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      };
      this.params.onClick(params);

    }
  }
}

@Component({
  selector: 'app-btn-cell-renderer-actions',
  template: `
    <div class="actions-container">
      <a  class="nav-link" placement="bottom"
         ngbTooltip="Actualizar" (click)="onClick($event)">
        <i id="update-action" class="bi bi-pencil-square"></i>
      </a>
      
      <a  class="nav-link trash" placement="bottom"
         ngbTooltip="Eliminar"  (click)="onClick($event)">
        <i id="delete-action" class="bi bi-trash"></i>
      </a>
    </div>
  `,
  styleUrls: ['./listaempleados.component.css'],
})
export class AppBtnCellRendererAccionComponent implements ICellRendererAngularComp {

  params;

  agInit(params): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(params);

    }
  }
}
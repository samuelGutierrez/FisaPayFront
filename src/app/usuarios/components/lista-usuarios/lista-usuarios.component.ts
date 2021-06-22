import { Component, OnInit } from '@angular/core';
import { ListaEmpleados, ListaUsuarios } from 'src/app/core/models';
import { EmpleadoService } from 'src/app/core/services';
import { AG_GRID_LOCALES } from 'src/app/shared/ag-grid-locale-es';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  // Castear el bit de si esta vacunado o no
  activeValueGetter = function (params: any) {
    const r = params.node.data[params.column.colId]
    return (r ? 'Si' : 'No');
  };

  //#region Variables para obtener el listado de usuarios
  listEmpleados: ListaEmpleados[];

  cabecera = [
    { headerName: 'Cedula Empleado', field: "cedula", sortable: true, filter: true },
    { headerName: 'Usuario', field: "cedula", sortable: true, filter: true },
    {
      headerName: 'Activo', field: "activo", sortable: true, filter: true,
      width: 80, suppressSizeToFit: true,
      headerClass: "center-header-class", cellStyle: { textAlign: 'center' },
      valueGetter: this.activeValueGetter
    },
  ];

  listUser: ListaUsuarios[];
  rowData: any;
  gridApi: any;
  gridColumnApi: any;
  searchValue: any;
  overlayLoadingTemplate = "";
  overlayNoRowsTemplate = "";
  localText = AG_GRID_LOCALES.ES;
  //#endregion

  constructor(private _empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.overlayLoadingTemplate = 'Cargando información, un momento por favor...';
    this.overlayNoRowsTemplate = 'No existe información para mostrar';
    this._empleadoService.getListaEmpleados().subscribe(
      data => {
        this.listUser = data as ListaUsuarios[];
      }
    );
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params: any): void {
    //this.gridColumnApi.autoSizeAllColumns();
    params.api.sizeColumnsToFit();
  }

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(this.searchValue);
  }
}

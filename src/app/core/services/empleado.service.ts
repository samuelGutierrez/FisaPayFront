import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RegistrarEmpleado } from "../models";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};

@Injectable({ providedIn: 'root' })
export class EmpleadoService {

    constructor(private _http: HttpClient) { }

    getListaEmpleados() {
        return this._http.get(`${environment.backendUrl}/api/Empleados`);
    }

    registrarEmpleado(crearEmpleado: RegistrarEmpleado): Observable<any> {
        return this._http.post(`${environment.backendUrl}/api/Empleados`, crearEmpleado);
    }

    eliminarEmpleado(cedula:number){
        return this._http.delete(`${environment.backendUrl}/api/Empleados/${cedula}`)
    }
}
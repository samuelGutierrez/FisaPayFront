import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ActualizarEmpleados, RegistrarEmpleado } from "../models";

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

    eliminarEmpleado(id: number) {
        return this._http.delete(`${environment.backendUrl}/api/Empleados/${id}`)
    }

    actualizarEmpleado(actualizarEmpleado: ActualizarEmpleados) {
        return this._http.put(`${environment.backendUrl}/api/Empleados`, actualizarEmpleado);
    }

    getbyId(id: number) {
        return this._http.get(`${environment.backendUrl}/api/Empleados/${id}`);
    }
}
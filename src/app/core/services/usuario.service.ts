import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RegistrarUsuario } from "../models";

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    constructor(private _http: HttpClient) { }

    registrarUsuario(crearUsuario: RegistrarUsuario): Observable<any> {
        return this._http.post(`${environment.backendUrl}/api/Usuarios/register`, crearUsuario);
    }

    getListaUsuarios(){
        return this._http.get(`${environment.backendUrl}/api/Usuarios`);
    }
}
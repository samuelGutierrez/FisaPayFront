import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private _http: HttpClient) { }

    login(usuario: string, password: string, intentos: number): Observable<any> {
        return this._http.post(`${environment.backendUrl}/api/Usuarios/authenticate`, {
            usuario, password, intentos
        }, httpOptions);
    }
}
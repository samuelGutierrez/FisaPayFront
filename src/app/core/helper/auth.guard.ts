import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, TokenStorageService } from "../services";

export class AuthGuard implements CanActivate {

    constructor(private _authService: AuthService,
        private _tokenStorageService: TokenStorageService,
        private _router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url: string = state.url;
        return this.checkUserLogin(next, url);
    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (this._tokenStorageService.getUser() != null) {
            return true;
        }
        this._router.navigate(['/dashboard']);
        return false;
    }
}
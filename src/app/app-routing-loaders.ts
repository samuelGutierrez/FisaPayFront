import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

export class AppCustomerPreloader implements PreloadingStrategy{
    preload(route: Route, load: Function): Observable<any> {
        return route.data && route.data.preaload ? load() : of(null);
    }
}
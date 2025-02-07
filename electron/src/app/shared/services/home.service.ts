import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    mapView = signal<"globe" | "map">("globe")

    constructor() {
    }
}

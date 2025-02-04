import {Injectable, signal} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PanelService {

    panelState = signal(false);

    openPanel() {
        this.panelState.set(true);
    }
    closePanel() {
        this.panelState.set(false);
    }

}

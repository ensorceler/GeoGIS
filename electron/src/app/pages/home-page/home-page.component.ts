import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {OpenMapComponent} from "../../shared/components/home/open-map/open-map.component";
import {OpenPanelComponent} from "../../shared/components/home/open-panel/open-panel.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        NavigationComponent,
        OpenMapComponent,
        OpenPanelComponent
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {

    constructor() {

    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}

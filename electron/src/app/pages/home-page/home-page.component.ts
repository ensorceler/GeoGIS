import {Component, inject, Inject, OnDestroy, OnInit} from '@angular/core';
import {NavigationComponent} from "../../shared/components/navigation/navigation.component";
import {OpenMapComponent} from "../../shared/components/home/open-map/open-map.component";
import {OpenPanelComponent} from "../../shared/components/home/open-panel/open-panel.component";
import {HomeService} from "../../shared/services/home.service";
import {GlobeMapComponent} from "../../shared/components/home/globe-map/globe-map.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        NavigationComponent,
        OpenMapComponent,
        OpenPanelComponent,
        GlobeMapComponent
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {

    homeService=inject(HomeService);

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}

import {Component, inject, OnDestroy, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import OLMap from "ol/Map";
import TileLayer from "ol/layer/Tile";
import {View} from "ol";
import {OSM} from "ol/source";
import {DrawFeaturesComponent} from "./draw-features/draw-features.component";
import {BaseMapComponent} from "./base-map/base-map.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {PanelService} from "../../../services/panel.service";
import {NgClass} from "@angular/common";
import {DrawingService} from "../../../services/drawing.service";

@Component({
    selector: 'app-open-map',
    standalone: true,
    imports: [
        DrawFeaturesComponent,
        BaseMapComponent,
        FaIconComponent,
        NgClass
    ],
    templateUrl: './open-map.component.html',
    styleUrl: './open-map.component.css'
})
export class OpenMapComponent implements OnInit, OnDestroy {

    map: WritableSignal<OLMap> = signal<OLMap>(new OLMap());
    panelService = inject(PanelService)
    drawingService= inject(DrawingService)

    ngOnInit() {
        //const
        const osmLayer = new TileLayer({
            source: new OSM(),
            zIndex: 1,
        });
        osmLayer.set('ol_basemap_id', 69);

        this.map.set(new OLMap({
            target: 'ol-map',
            layers: [
                osmLayer
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        }));

    }

    ngOnDestroy() {

    }

    openPanel() {
        //this.
        if (!this.panelService.panelState()) {
            this.panelService.openPanel();
        } else {
            this.panelService.closePanel();
        }
    }

    protected readonly faArrowLeft = faArrowLeft;
    protected readonly faArrowRight = faArrowRight;
}

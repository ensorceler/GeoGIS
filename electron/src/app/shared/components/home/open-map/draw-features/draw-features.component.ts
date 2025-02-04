import {Component, inject, input, Input, model, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCircle, faDrawPolygon, faGripLines, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import OLMap from "ol/Map";
import Draw from 'ol/interaction/Draw';
import VectorSource from "ol/source/Vector";
import {Type as GeometryType} from "ol/geom/Geometry"
import {NgClass} from "@angular/common";
import VectorLayer from "ol/layer/Vector";
import {GeoJSON} from "ol/format";
import {DrawingService} from "../../../../services/drawing.service";
import {HlmTooltipComponent, HlmTooltipTriggerDirective} from "@spartan-ng/ui-tooltip-helm";
import {BrnTooltipContentDirective} from "@spartan-ng/brain/tooltip";
import {circular} from "ol/geom/Polygon";
import {Feature} from "ol";
import Circle from 'ol/geom/Circle';


@Component({
    selector: 'app-draw-features',
    standalone: true,
    imports: [
        FaIconComponent,
        NgClass,
        HlmTooltipTriggerDirective,
        HlmTooltipComponent,
        BrnTooltipContentDirective,
    ],
    templateUrl: './draw-features.component.html',
    styleUrl: './draw-features.component.css'
})
export class DrawFeaturesComponent implements OnInit, OnDestroy {
    protected readonly faDrawPolygon = faDrawPolygon;
    protected readonly faCircle = faCircle;
    protected readonly faLocationDot = faLocationDot;
    protected readonly faGripLines = faGripLines;

    map = model<OLMap>();

    drawVectorSource = new VectorSource({
        wrapX: false,
    });

    drawingService = inject(DrawingService);

    drawType: 'point' | 'line' | 'polygon' | 'circle' | 'none' = 'none';
    draw: WritableSignal<Draw | null> = signal(null);

    ngOnInit() {
        //this.map().addInteraction();
        // @ts-ignore
        //const drawVectory

        const drawVectorLayer = new VectorLayer({
            source: this.drawVectorSource,
            zIndex: 10,
            style: (feature) => {
                //if (feature.getGeometry()==="LineString"){}
                const geometryType = feature?.getGeometry()!.getType();
                return this.drawingService.getStyleBasedOnGeometry(geometryType);
            }
        });

        this.drawVectorSource.addEventListener('addfeature', (event) => {
            //this.pane
            console.log('add vector source event=>', event);
            this.drawingService.drawnFeaturesGeoJSON.set(this.getGEOJSON())
        })

        /*
        this.drawVectorSource.addEventListener('change', (event) => {
            //this.pane
            console.log('changed vector source =>', event);
            this.drawingService.drawnFeaturesGeoJSON.set(this.getGEOJSON())
        })*/

        this.map.update((map) => {
            map?.addLayer(drawVectorLayer)
            return map
        })
    }

    ngOnDestroy() {
    }

    removeDraw() {
        if (this.draw()) {
            this.map.update((map) => {
                    //map.setInteraction(draw);
                    if (map instanceof OLMap) {
                        map.removeInteraction(this.draw()!)
                    }
                    return map
                }
            );
            this.draw.set(null);
            //console.log('features =>',this.drawVectorSource.get)
            this.getGEOJSON()
        }

        this.drawingService.drawingActivated.set(false);

    }

    getGEOJSON() {
        const format = new GeoJSON({featureProjection: "EPSG:3857"});
        const json = format.writeFeatures(this.drawVectorSource.getFeatures())
        console.log('geojson features =>', json)
        return json;
    }


    newDraw(geometryType: GeometryType) {
        const draw = new Draw({
            source: this.drawVectorSource,
            type: geometryType,
            style: this.drawingService.getDrawingInteractionStyle(),
        });
        draw.on('drawend', (event) => {
            const feature = event.feature;
            const geometry = feature.getGeometry();

            if (geometry instanceof Circle) {
                // Convert circle to polygon
                const center = geometry?.getCenter();
                const radius = geometry?.getRadius();
                const polygon = circular(center, radius, 64);

                // Create new feature with the polygon
                const polygonFeature = new Feature({
                    geometry: polygon
                });

                // Remove the circle feature and add the polygon feature
                console.log('circle feature removed =>',feature);
                this.drawVectorSource.removeFeature(feature);
                this.drawVectorSource.addFeature(polygonFeature);

                // Update GeoJSON
                //this.drawingService.drawnFeaturesGeoJSON.set(this.getGEOJSON());
            }
        });
        return draw;
    }

    activateDraw(chosenDrawType: typeof this.drawType) {
        if (this.drawType === chosenDrawType) {
            this.removeDraw();
            this.drawType = 'none';
            return;
        }
        this.drawType = chosenDrawType;
        let geometryType: GeometryType = "Point";
        this.removeDraw();
        switch (chosenDrawType) {
            case "point":
                geometryType = "Point"
                break;
            case "line":
                geometryType = "LineString"
                break;
            case "circle":
                geometryType = "Circle"
                break;
            case "polygon":
                geometryType = "Polygon";
                break;
            case "none":

        }

        this.draw.set(this.newDraw(geometryType))

        this.map.update((map) => {
                //map.setInteraction(draw);
                if (map instanceof OLMap) {
                    map.addInteraction(this.draw()!)
                }
                return map
            }
        );

        this.drawingService.drawingActivated.set(true);

    }
}

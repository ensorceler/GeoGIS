import {Component, signal, model, OnInit} from '@angular/core';
import {HlmToggleDirective} from "@spartan-ng/ui-toggle-helm";
import {NgForOf, NgClass} from "@angular/common";
import TileLayer from "ol/layer/Tile";
import {XYZ} from "ol/source";
import OLMap from "ol/Map";

@Component({
    selector: 'app-base-map',
    standalone: true,
    imports: [HlmToggleDirective, NgForOf, NgClass],
    templateUrl: './base-map.component.html',
    styleUrl: './base-map.component.css'
})
export class BaseMapComponent implements OnInit {
    map = model<OLMap>();
    isOpen = signal(false);

    baseMapList = signal([
        {
            id: 1,
            name: "Open Street",
            thumbnail: "assets/img/basemap_openstreet.png",
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            active: true,
        },
        {
            id: 2,
            name: "Streets",
            thumbnail: "/assets/img/basemap_streets.jpg",
            url: "https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
            active: false,
        },
        /*
        {
            id: 3,
            name: "No Basemap",
            thumbnail: "assets/thumbnails/no-basemap.png",
            url: "",
            active: false,
        }
         */
        {
            id: 4,
            name: "Terrain",
            thumbnail: "/assets/img/basemap_terrain.png",
            //thumbnail: "assets/thumbnails/nic-terrain.png",
            url: "https://server.arcgisonline.com/arcgis/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
            active: false,
        },
        {
            id: 5,
            name: "Topology",
            //thumbnail: "assets/thumbnails/nic-base.png",
            thumbnail: "/assets/img/basemap_topo.jpg",
            //thumbnail: "assets/thumbnails/nic-base.png",
            url: "https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
            active: false,
        },
        {
            id: 6,
            name: "Satellite",
            //thumbnail: "assets/thumbnails/nic-satellite.png",
            thumbnail: "/assets/img/basemap_imagery.jpg",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            active: false,
        },
        {
            id: 7,
            name: "Satellite Hybrid",
            thumbnail: "/assets/img/basemap_hybrid.png",
            url: 'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
            active: false,
        },
    ]);

    ngOnInit() {

    }

    togglePanel() {
        this.isOpen.update(v => !v);
    }

    baseMapChange(baseMapID: number) {
        if (!this.baseMapList().find(map => map.id === baseMapID)?.url) return;

        this.removeAllBaseMapsFromMap();

        this.map.update((map) => {
            const basemap = this.baseMapList().filter(basemap => (basemap.id === baseMapID));
            const tileLayer = new TileLayer({
                source: new XYZ({
                    url: basemap[0].url
                }),
                zIndex: 1,
            });
            tileLayer.set("ol_basemap_id", basemap[0].id);
            map?.addLayer(tileLayer)
            return map;
        });

        this.baseMapList.update(list => {
            return list.map(basemap => ({
                ...basemap,
                active: basemap.id === baseMapID
            }));
        });
    }

    removeAllBaseMapsFromMap() {
        this.map.update((map) => {
            const layers = map?.getAllLayers();
            let toBeDeletedLayers = [];
            if (layers) {
                for (let layer of layers) {
                    if (layer.get('ol_basemap_id')) {
                        toBeDeletedLayers.push(layer);
                    }
                }
            }
            for (let layer of toBeDeletedLayers) {
                map?.removeLayer(layer);
            }
            return map;
        });
    }
}


/*
import {Component, model, OnInit, signal} from '@angular/core';
import {BrnToggleDirective} from "@spartan-ng/brain/toggle";
import OLMap from "ol/Map";
import {HlmToggleDirective} from "@spartan-ng/ui-toggle-helm";
import {NgForOf} from "@angular/common";
import TileLayer from "ol/layer/Tile";
import {XYZ} from "ol/source";
import {tile} from "ol/loadingstrategy";


google maps layers
h = roads only
m = standard roadmap
p = terrain
r = somehow altered roadmap
s = satellite only
t = terrain only
y = hybrid

@Component({
    selector: 'app-base-map',
    standalone: true,
    imports: [BrnToggleDirective, HlmToggleDirective, NgForOf],
    templateUrl: './base-map.component.html',
    styleUrl: './base-map.component.css'
})
export class BaseMapComponent implements OnInit {


    map = model<OLMap>()

    baseMapList = signal([
        {
            id: 1,
            name: "GIS World",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            active: false,
        }, {
            id: 2,
            name: "USGS Imagery",
            url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}",
            active: false,
        },
        {
            id: 3,
            name: "OpenStreet",
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            active: true,
        },
        {
            id: 4,
            name: "Satellite Hybrid",
            url: 'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
            active: false,
        },
        {
            id: 5,
            name: "World Elevation",
            url: "https://server.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}",
            active: false,
        }
    ]);

    ngOnInit() {

    }

    baseMapChange(event: any, baseMapID: number) {
        console.log('base map change =>', event, baseMapID);
        this.removeAllBaseMapsFromMap();

        this.map.update((map) => {
            const basemap = this.baseMapList().filter(basemap => (basemap.id === baseMapID));
            const tileLayer = new TileLayer({
                source: new XYZ({
                    url: basemap[0].url
                }),
                zIndex: 1,
            });
            tileLayer.set("ol_basemap_id", basemap[0].id);
            map?.addLayer(tileLayer)
            return map
        })

        this.baseMapList.update(list => {
            return list.map(basemap => (basemap.id === baseMapID) ? ({...basemap, active: true}) : ({
                ...basemap,
                active: false
            }));
        });
    }

    removeAllBaseMapsFromMap() {
        //this.map
        this.map.update((map) => {
            const layers = map?.getAllLayers();
            let toBeDeletedLayers = [];
            if (layers) {
                for (let layer of layers) {
                    if (layer.get('ol_basemap_id')) {
                        toBeDeletedLayers.push(layer);
                    }
                }
            }
            for (let layer of toBeDeletedLayers) {
                map?.removeLayer(layer);
            }
            return map;
        })
    }
}


<div class="basemap-container ">
    <div class="flex flex-row text-sm bg-white px-2 py-1 rounded-lg">
        <ng-container *ngFor="let basemap of baseMapList()">
            <button size="xs" brnToggle hlm variant="primary"
                    (stateChange)="baseMapChange($event,basemap.id)" [state]="basemap.active?'on':'off'">
                {{ basemap.name }}
            </button>
        </ng-container>
    </div>
</div>

.basemap-container {
    font-size: 24px;
    border-radius: 8px;
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.12), 0px 1px 2px 0px rgba(0, 0, 0, 0.04);
position: absolute;
left: 10px;
bottom: 30px;
}


*/
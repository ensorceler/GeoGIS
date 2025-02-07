import {Component, OnDestroy, OnInit} from '@angular/core';
import {Viewer, Ion, CesiumTerrainProvider, Terrain} from "cesium";

@Component({
  selector: 'app-globe-map',
  standalone:true,
  imports: [],
  templateUrl: './globe-map.component.html',
  styleUrl: './globe-map.component.css'
})
export class GlobeMapComponent implements OnInit,OnDestroy{



  ngOnInit() {
    this.loadCesium();
  }

  async loadCesium(){
    //Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMWYzZDBhMC00YjI3LTRiZGItOWU4OS02YzQ1NTJhYmU0OGIiLCJpZCI6MjczODk5LCJpYXQiOjE3Mzg4NDg5Mjh9.2aWuAaKRGXXExuALuFWy5Djh2gZsFFUnndlmTzvtfDM";
    const viewer = new Viewer("cesiumContainer",{
      terrain: Terrain.fromWorldTerrain(),
    });
  }
  ngOnDestroy() {
  }
}

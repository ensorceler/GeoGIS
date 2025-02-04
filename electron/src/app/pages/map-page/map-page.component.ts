import {Component, OnDestroy, OnInit} from '@angular/core';
import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

@Component({
  selector: 'app-map-page',
  standalone:true,
  imports: [],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent implements OnInit,OnDestroy{

  threeRenderer: THREE.WebGLRenderer;
  threeCamera: THREE.PerspectiveCamera;
  threeScene: THREE.Scene;
  threeOrbitControls: OrbitControls;

  constructor() {
    //threeRenderer: THREE.WebGLRenderer=;
  }

  ngOnInit() {
    this.checkWebGL2Compatibility();
    this.createThreeScene();
  }

  ngOnDestroy() {
  }

  checkWebGL2Compatibility() {
    if (WebGL.isWebGL2Available()) {
      // Initiate function or other initializations here
      //animate();
      console.log("WebGL2 Compatibility is available");
    } else {
      console.error("No WebGL2 Compatibility ");
      //const warning = WebGL.getWebGL2ErrorMessage();
      //document.getElementById( 'container' ).appendChild( warning );

    }
  }

  createThreeScene() {
    const canvasElement = document.getElementById('three-canvas') as HTMLCanvasElement;

    this.threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.threeCamera.position.z=5;

    this.threeRenderer = (
        new THREE.WebGLRenderer({
          canvas: canvasElement,
          //antialias: true,
          //pixelRatio: window.devicePixelRatio
        })
    );
    this.threeScene = (new THREE.Scene());
    this.threeScene.background=new THREE.Color('#e5e7eb');

    this.threeRenderer.setSize(window.innerWidth, window.innerHeight, false);
    this.threeRenderer.setPixelRatio(window.devicePixelRatio);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const sphereGeometry= new THREE.SphereGeometry( 1, 32, 16 );
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const standardMaterial= new THREE.MeshStandardMaterial( { color: 0xffff00 });
    const phongMaterial=new THREE.MeshPhongMaterial({color: 0xffff00, side: THREE.DoubleSide});

    const cube = new THREE.Mesh(geometry, material);
    const sphere=new THREE.Mesh(sphereGeometry,phongMaterial)
    //this.threeScene.add(cube);
    sphere.position.set(0,0,0);

    this.threeScene.add(sphere);
    //this.threeScene.add(cube);

    // ambient light
    const ambientLight=new THREE.AmbientLight("#fff",0.25)
    //this.threeScene.add(ambientLight);
    ///const ambientLight=new THREE.AmbientLight('#fff',100);
    this.threeScene.add(ambientLight)
    // controls
    this.threeOrbitControls = new OrbitControls(this.threeCamera, this.threeRenderer.domElement);

    //diretional light

    const directionalLight=new THREE.DirectionalLight('#fff',10)
    directionalLight.position.set(1,2,0);

    //directionalLight.target.position.x=0;
    //directionalLight.target.position.y=0;
    //directionalLight.target.position.z=0;
    this.threeScene.add(directionalLight)
    //this.threeScene.add(directionalLight.target)
    const animate = () => {
      this.threeRenderer.render(this.threeScene, this.threeCamera);
    }

    // set animation loop
    this.threeRenderer.setAnimationLoop(animate)
  }

}

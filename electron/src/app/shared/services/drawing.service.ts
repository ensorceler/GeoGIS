import {Injectable, signal} from '@angular/core';
import {Circle, Fill, Stroke, Style, Icon} from "ol/style";
import {Type as GeometryType} from "ol/geom/Geometry"

type BasicGeometryType = 'Point' | 'LineString' | 'Polygon';

interface BasicStyleMap {
    // @ts-ignore
    [key in BasicGeometryType]: Style;
}

@Injectable({
    providedIn: 'root'
})
export class DrawingService {
    drawnFeaturesGeoJSON = signal<any>("");
    drawingActivated = signal<boolean>(false);

    styles: BasicStyleMap = {
        // Point Style
        'Point': new Style({
            image: new Icon({
                src: "assets/svg/location-pin-filled.svg"
            })
        }),

        'Circle': new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new Stroke({
                color: '#33cc33',
                width: 2,
            }),
            image: new Circle({
                radius: 6,
                fill: new Fill({
                    color: '#3388ff'
                }),
                stroke: new Stroke({
                    color: '#ffffff',
                    width: 2
                })
            })
        }),

        // LineString Style
        'LineString': new Style({
            stroke: new Stroke({
                color: '#33cc33',
                width: 2,
                //lineDash: [8, 6]  // Optional: creates dashed line
            })
        }),

        // Polygon Style
        'Polygon': new Style({
            stroke: new Stroke({
                color: '#33cc33',
                width: 2
            }),
            fill: new Fill({
                color: 'rgba(51, 204, 51, 0.3)'  // Semi-transparent green
            })
        })
    };


    constructor() {
    }

    getStyleBasedOnGeometry(geometry: GeometryType) {
        //return this.styles?.[geometry];
        //@ts-ignore
        let style = this.styles?.[geometry] ?? new Style({});
        return style;
    }

    getDrawingInteractionStyle() {
        const strokeStyle = new Stroke({
            color: '#eab308' , // Orange color for the border
            width: 2, // Border width
            lineDash: [5, 5], // Dashed line pattern
        });

        const style = new Style({
            stroke: strokeStyle,
            fill: new Fill({
                color:  'rgba(255, 165, 0, 0.2)', // Opaque orange background for the polygon
            }),
        });
        return style;
    }
}

/*

// More advanced styling with conditions:
const advancedStyles = {
  Point: (feature) => {
    return new Style({
      image: new Circle({
        radius: feature.get('size') || 6,  // Dynamic size based on feature property
        fill: new Fill({
          color: feature.get('color') || '#3388ff'
        }),
        stroke: new Stroke({
          color: '#ffffff',
          width: 2
        })
      })
    });
  },

  LineString: (feature) => {
    return new Style({
      stroke: new Stroke({
        color: feature.get('color') || '#ff3333',
        width: feature.get('width') || 3,
        lineDash: feature.get('dashed') ? [8, 6] : null
      })
    });
  },

  Polygon: (feature) => {
    return new Style({
      stroke: new Stroke({
        color: feature.get('strokeColor') || '#33cc33',
        width: feature.get('strokeWidth') || 2
      }),
      fill: new Fill({
        color: feature.get('fillColor') || 'rgba(51, 204, 51, 0.3)'
      })
    });
  }
};



 */
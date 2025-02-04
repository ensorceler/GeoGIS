import {Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {MapPageComponent} from "./pages/map-page/map-page.component";

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'map',
        component: MapPageComponent
    },
];

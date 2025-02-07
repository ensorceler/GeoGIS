import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {Ion} from "cesium";
(window as Record<string, any>)['CESIUM_BASE_URL'] = '/assets/cesium/';

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMWYzZDBhMC00YjI3LTRiZGItOWU4OS02YzQ1NTJhYmU0OGIiLCJpZCI6MjczODk5LCJpYXQiOjE3Mzg4NDg5Mjh9.2aWuAaKRGXXExuALuFWy5Djh2gZsFFUnndlmTzvtfDM";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

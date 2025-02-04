import {
    Component,
    computed,
    effect,
    inject,
    OnDestroy,
    OnInit,
    ElementRef,
    ViewChild,
    AfterViewInit
} from '@angular/core';
import { PanelService } from "../../../services/panel.service";
import { JsonPipe, NgClass } from "@angular/common";
import {
    HlmTabsComponent,
    HlmTabsContentDirective,
    HlmTabsListComponent,
    HlmTabsTriggerDirective
} from "@spartan-ng/ui-tabs-helm";
import {
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective
} from "@spartan-ng/ui-card-helm";
import { DrawingService } from "../../../services/drawing.service";
import loader from '@monaco-editor/loader';
import * as monaco from 'monaco-editor';

@Component({
    selector: 'app-open-panel',
    standalone: true,
    imports: [
        NgClass,
        HlmTabsListComponent,
        HlmTabsComponent,
        HlmTabsContentDirective,
        HlmTabsTriggerDirective,
        HlmCardDirective,
        HlmCardHeaderDirective,
        HlmCardTitleDirective,
        HlmCardDescriptionDirective,
        HlmCardContentDirective,
        HlmCardFooterDirective,
        JsonPipe,
    ],
    templateUrl: './open-panel.component.html',
    styleUrl: './open-panel.component.css'
})
export class OpenPanelComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('editorContainer') editorContainer!: ElementRef;

    private editor: monaco.editor.IStandaloneCodeEditor | null = null;
    private _subscription: monaco.IDisposable | null = null;

    panelService = inject(PanelService);
    drawingService = inject(DrawingService);

    geojson = computed(() => {
        try {
            const rawData = this.drawingService.drawnFeaturesGeoJSON();
            console.log('Raw GeoJSON:', rawData);
            return JSON.stringify(JSON.parse(rawData), null, 2);
        } catch (err) {
            console.error('Error parsing GeoJSON:', err);
            return "";
        }
    });

    constructor() {
        effect(() => {
            console.log('drawn geojson =>',this.drawingService.drawnFeaturesGeoJSON())
            this.updateEditorContent();
        });
    }

    ngOnInit() {
        // Configure Monaco loader
        loader.config({
            paths: {
                vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'
            }
        });
        this.initMonaco();
    }

    ngAfterViewInit() {
    }

    private async initMonaco() {
        try {
            const monaco = await loader.init();

            this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
                value: JSON.stringify({
                    "type": "FeatureCollection",
                    "features": []
                }, null, 2),
                language: 'json',
                automaticLayout: true,
                formatOnPaste: true,
                formatOnType: true,
                minimap: {
                    enabled: false
                },
                scrollBeyondLastLine: false,
                fontSize: 14,
                wordWrap: 'on'
            });

        } catch (error) {
            console.error('Error initializing Monaco Editor:', error);
        }
    }

    private updateEditorContent() {
        if (!this.editor) return;

        try {
            const newContent = this.geojson();
            console.log("new content =>",newContent)
            if (newContent !== "") {
                console.log('Updating editor with:', newContent);
                this.editor.setValue(newContent);
            }
        } catch (err) {
            console.error("Error updating editor content:", err);
        }
    }

    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.dispose();
        }
        if (this.editor) {
            this.editor.dispose();
        }
    }
}
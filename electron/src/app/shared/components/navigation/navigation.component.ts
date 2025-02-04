import { Component } from '@angular/core';
import {
  HlmMenuBarComponent, HlmMenuBarItemDirective,
  HlmMenuComponent, HlmMenuGroupComponent, HlmMenuItemCheckboxDirective, HlmMenuItemCheckComponent,
  HlmMenuItemDirective, HlmMenuItemIconDirective, HlmMenuItemRadioComponent, HlmMenuItemRadioDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent
} from "@spartan-ng/ui-menu-helm";
import {BrnMenuTriggerDirective} from "@spartan-ng/brain/menu";

function HlmButtonDirective() {

}

@Component({
  selector: 'app-navigation',
  standalone:true,
  imports: [
    HlmMenuComponent,
    HlmMenuBarComponent,
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuBarItemDirective,
    HlmMenuItemCheckComponent,
    HlmMenuItemRadioComponent,
    HlmMenuGroupComponent,
    HlmMenuItemCheckboxDirective,
    HlmMenuItemRadioDirective,
    BrnMenuTriggerDirective,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

}

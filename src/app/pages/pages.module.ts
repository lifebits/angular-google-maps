import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HelpComponent} from './help/help.component';
import {AboutComponent} from './about/about.component';


@NgModule({
   imports: [
      CommonModule,
   ],
   declarations: [
      HelpComponent,
      AboutComponent
   ]
})
export class PagesModule {
}

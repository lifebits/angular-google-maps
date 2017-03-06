import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {HelpComponent} from './help/help.component';
import { AboutComponent } from './about/about.component';

const pagesRoutes: Routes = [
   {path: 'pages', component: HelpComponent}
];

@NgModule({
   imports: [
      CommonModule,
      RouterModule.forRoot(pagesRoutes)
   ],
   declarations: [
      HelpComponent,
      AboutComponent
   ]
})
export class PagesModule {
}

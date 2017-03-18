import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

//import {PagesComponent} from './pages.component';
import {HelpComponent} from './help/help.component';
import {AboutComponent} from './about/about.component';


const routes: Routes = [
   //{path: '',  redirectTo: 'help', pathMatch: 'full'},
   {path: 'help', outlet: 'page', component: HelpComponent},
   {path: 'about', outlet: 'page', component: AboutComponent}
];

@NgModule({
   imports: [
      CommonModule,
      RouterModule.forChild(routes)
   ],
   declarations: [
      //PagesComponent,
      HelpComponent,
      AboutComponent
   ]
})
export class PagesModule {
}

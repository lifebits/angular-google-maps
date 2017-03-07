import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

import {HelpComponent} from './help/help.component';
import {AboutComponent} from './about/about.component';


const routes: Routes = [
   {path: '', redirectTo: 'about', pathMatch: 'full'},
   {path: 'help', component: HelpComponent},
   {path: 'about', component: AboutComponent}
];

@NgModule({
   imports: [
      CommonModule,
      RouterModule.forChild(routes)
   ],
   declarations: [
      HelpComponent,
      AboutComponent
   ]
})
export class PagesModule {
}

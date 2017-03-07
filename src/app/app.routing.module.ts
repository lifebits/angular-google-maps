import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MapsComponent} from './maps/maps.component';
import {HelpComponent} from './pages/help/help.component';
import {AboutComponent} from './pages/about/about.component';


const routes: Routes = [

   {
      path: '', component: MapsComponent
   },
   {
      path: 'pages',
      loadChildren: './pages/pages.module#PagesModule'
   },
   /*{
      path: 'pages',
      children: [
         //{path: '', redirectTo: 'about', pathMatch: 'full'},
         {path: 'help', component: HelpComponent},
         {path: 'about', component: AboutComponent}
      ]
   }*/

   //{ path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' }

];

@NgModule ({
   imports: [ RouterModule.forRoot(routes) ],
   exports: [ RouterModule ]
})
export class AppRoutingModule {}
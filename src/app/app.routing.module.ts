import {NgModule} from '@angular/core';
import {RouterModule, PreloadAllModules, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {MainMapsNavigateComponent} from './+maps/main-map-navigate/main-map-navigate.component';


const routes: Routes = [

   {
      path: '',
      component: AppComponent,
      loadChildren: './+pages/pages.module#PagesModule'
   },
   {
      path: ':city',
      component: MainMapsNavigateComponent,
      loadChildren: './+maps/maps.module#MapsModule'
   }

];

@NgModule ({
   imports: [
      RouterModule.forRoot(
         routes,
         { preloadingStrategy: PreloadAllModules }
      )
   ],
   exports: [ RouterModule ]
})
export class AppRoutingModule {}
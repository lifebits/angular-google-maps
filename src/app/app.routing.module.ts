import {NgModule} from '@angular/core';
import {RouterModule, PreloadAllModules, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {MainMapsNavigateComponent} from './+maps/main-map-navigate/main-map-navigate.component';
import {MapPointPreviewComponent} from './+maps/map-point-preview/map-point-preview.component';

const routes: Routes = [

   /*{
      path: ':city',
      component: MainMapsNavigateComponent,
      children: [
      //   {path: '', component: MainMapsNavigateComponent},
         {path: ':pointId', component: MapPointPreviewComponent}
      ]
   },*/
   {
      path: '',
      component: AppComponent
   },
   {
      path: ':city',
      component: MainMapsNavigateComponent,
      loadChildren: './+maps/maps.module#MapsModule'
   },
   {
      path: ':city',
      loadChildren: './+pages/pages.module#PagesModule'
   },

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
import {NgModule} from '@angular/core';
import {RouterModule, PreloadAllModules, Routes} from '@angular/router';

import {MapsComponent} from './maps/maps.component';

const routes: Routes = [

   {
      path: '', component: MapsComponent
   },
   {
      path: 'pages',
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
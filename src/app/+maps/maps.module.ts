import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MapsService } from './maps.service';
import { MainMapService } from './main-map/main-map.service';

import { MapsComponent } from './main-map/main-maps.component';
import { MainMapsNavigateComponent } from './main-map-navigate/main-map-navigate.component';
import { MapPointPreviewComponent } from './map-point-preview/map-point-preview.component';


const routes: Routes = [
   {path: 'place/:pointId', component: MapPointPreviewComponent},
];

@NgModule({
   imports: [
      CommonModule,
      RouterModule.forChild(routes)
   ],
   declarations: [
      MapsComponent,
      MainMapsNavigateComponent,
      MapPointPreviewComponent
   ],
   providers: [
      MapsService,
      MainMapService
   ],
   exports: [
      //MapsComponent, MainMapsNavigateComponent, MapPointPreviewComponent
   ]
})
export class MapsModule {}

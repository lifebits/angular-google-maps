import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MapsService } from './maps.service';
import { MainMapService } from './main-map.service';

import { MapsComponent } from './maps.component';
import { MainMapsNavigateComponent } from './main-map-navigate/main-map-navigate.component';
import { MapPointPreviewComponent } from './map-point-preview/map-point-preview.component';


const routes: Routes = [
   {path: ':pointId', component: MapPointPreviewComponent},
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

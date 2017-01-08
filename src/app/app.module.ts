import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MapsComponent} from './maps/maps.component';
import {MainSearchComponent} from './main-search/main-search.component';
import { PointsPreviewComponent } from './main-search/points-preview/points-preview.component';

import {MapsService} from './maps/maps.service';
import {MainMapService} from './maps/main-map.service';
import {SearchService} from './main-search/search.service';


@NgModule({
   declarations: [
      AppComponent,
      MapsComponent,
      MainSearchComponent,
      PointsPreviewComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule
   ],
   providers: [
      MapsService,
      MainMapService,
      SearchService
   ],
   bootstrap: [AppComponent]
})
export class AppModule {}

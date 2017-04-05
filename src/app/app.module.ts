import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {MainSearchComponent} from './main-search/main-search.component';
import {PointsPreviewComponent} from './main-search/search-result/search-result.component';

import {SearchService} from './main-search/search.service';

import {MapsModule} from  './+maps/maps.module';
import {PagesModule} from './+pages/pages.module';

import {AppRoutingModule} from './app.routing.module';


@NgModule({
   declarations: [
      AppComponent,
      MainSearchComponent,
      PointsPreviewComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      AppRoutingModule,
      MapsModule,
      PagesModule,
   ],
   providers: [
      SearchService
   ],
   bootstrap: [AppComponent]
})
export class AppModule {}

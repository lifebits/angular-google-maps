import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {MapsComponent} from './maps/maps.component';
import {MainSearchComponent} from './main-search/main-search.component';
import {PointsPreviewComponent} from './main-search/points-preview/points-preview.component';

import {MapsService} from './maps/maps.service';
import {MainMapService} from './maps/main-map.service';
import {SearchService} from './main-search/search.service';

import {PagesModule} from './pages/pages.module';
import {HelpComponent} from './pages/help/help.component';
import {AboutComponent} from './pages/about/about.component';

const appRoutes: Routes = [
   //{path: '/:city', component: MapsComponent},
   {
      path: 'pages',
      children: [
         {path: '', redirectTo: 'about', pathMatch: 'full'},
         {path: 'help', component: HelpComponent},
         {path: 'about', component: AboutComponent}
      ]
   }
];

@NgModule({
   declarations: [
      AppComponent,
      MapsComponent,
      MainSearchComponent,
      PointsPreviewComponent,
      HelpComponent,
      AboutComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      //PagesModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      MapsService,
      MainMapService,
      SearchService
   ],
   bootstrap: [AppComponent]
})
export class AppModule {}

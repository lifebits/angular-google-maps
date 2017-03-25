import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {MapPoint} from '../maps.interface';
import {MapsService} from '../maps.service';
import {MainMapService} from './main-map.service';

import {ActivatedRoute} from '@angular/router';

@Component({
   selector: 'app-maps',
   templateUrl: './maps.component.html',
   styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

   constructor(
      private http: Http,
      private mapsService: MapsService,
      private mainMapService: MainMapService,
      private route: ActivatedRoute) {
   }

   ngOnInit() {

      this.route.queryParams
         .subscribe(queryParams => console.log('MAPS', queryParams));

      this.mainMapService.initMap()
         .then(map => this.getMapPoint())
         .then(placeList => this.mapsService.addMarkers(this.mainMapService.map, placeList))
         .then(markersList => {
            this.mainMapService.markers = markersList;
            return this.mapsService.setMarkerCluster(this.mainMapService.map, markersList)
         })
         .then(markerCluster => this.mainMapService.markerClusterer = markerCluster)

   }

   getMapPoint(): Promise<MapPoint[]> {
      return this.http.get('./assets/mocks/cities.json')
         .toPromise()
         .then(response => response.json())
   }
}

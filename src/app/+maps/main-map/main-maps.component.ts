import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {MapPoint} from '../maps.interface';
import {MainMapService} from './main-map.service';


@Component({
   selector: 'app-maps',
   templateUrl: './main-maps.component.html',
   styleUrls: ['./main-maps.component.css']
})
export class MapsComponent implements OnInit {

   constructor(
      private http: Http,
      private mainMap: MainMapService) {
   }

   ngOnInit() {

      this.mainMap.initMap()
         .then(map => this.getMapPoint())
         .then(placeList => this.mainMap.mapAddMarkers(placeList))
         .then(markersList => {
            this.mainMap.markers = markersList;
            return this.mainMap.setMarkerCluster(this.mainMap.map, markersList);
         })
         .then(markerCluster => this.mainMap.markerClusterer = markerCluster);

   }

   getMapPoint(): Promise<MapPoint[]> {
      return this.http.get('./assets/mocks/cities.json')
         .toPromise()
         .then(response => response.json())
   }
}

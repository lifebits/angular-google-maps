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
      private mainMap: MainMapService) {
   }

   ngOnInit() {


      this.mainMap.initMap()
         .then(map => this.getMapPoint())
         .then(placeList => this.mapsService.addMarkers(this.mainMap.map, placeList))
         .then(markersList => {
            this.mainMap.markers = markersList;
            return this.mapsService.setMarkerCluster(this.mainMap.map, markersList)
         })
         .then(markerCluster => this.mainMap.markerClusterer = markerCluster);

   }

   getMapPoint(): Promise<MapPoint[]> {
      return this.http.get('./assets/mocks/cities.json')
         .toPromise()
         .then(response => response.json())
   }
}

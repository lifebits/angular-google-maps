import {Injectable} from '@angular/core';

import {MapsService} from './maps.service';

@Injectable()
export class MainMapService extends MapsService{

   public map: any;
   public markers: any[];
   public markerClusterer: any;

   //constructor() { super(); }

   public initMap() {
      return this.loadAPI()
         .then(google => {
            this.mapOption.mapTypeControlOptions = {
               style: google['maps'].MapTypeControlStyle.DEFAULT,
               position: google['maps'].ControlPosition.TOP_RIGHT
            };
            this.map = new google['maps'].Map(document.getElementById('map'), this.mapOption)
         })
   }

   public updateMarkers(newPoint): void {
      this.resetMap();
      this.markers = this.addMarkers(this.map, newPoint);

      if (this.markers.length > 1) {
         this.markerClusterer = this.setMarkerCluster(this.map, this.markers);
      }
   }

   public hideCurrentMarkers() {
      this.clearMarkersAndClusterer(this.markerClusterer);
   }

   public showCurrentMarkers() {
      this.markerClusterer = this.setMarkerCluster(this.map, this.markers);
   }

   public resetMap(): void {
      if (this.markerClusterer) {
         this.clearMarkersAndClusterer(this.markerClusterer);
         this.markerClusterer = null;
      } else {
         this.clearMarkers(this.markers);
      }
      this.markers = [];
   }

}

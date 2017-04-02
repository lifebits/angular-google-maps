import {Injectable} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";

import {MapsService} from '../maps.service';
import {MapOptionsConfig} from "../maps.interface";


@Injectable()
export class MainMapService extends MapsService{

   public map: any;
   public markers: any[];
   public markerClusterer: any;

   private mapOptions: MapOptionsConfig = this.defaultMapsOptions;
   private mapOptionsSource = new Subject<MapOptionsConfig>();
   public mapOptions$ = this.mapOptionsSource.asObservable();

   private subscription: Subscription;

   constructor() {
      super();

      console.log('START MapOpts: ', this.mapOptions);
      this.mapOptions$.subscribe(
         mapOptions => {
            console.log('Map Options Changes: ', mapOptions);
         }
      );
   }

   public changeMapOptions(newOptions?: MapOptionsConfig): void {
      if (newOptions) {
         this.mapOptions = Object.assign(this.mapOptions, newOptions);
      }
      this.mapOptionsSource.next(this.mapOptions);
   }

   public initMapOptions() {
      return new Promise(resolve => {
         this.mapOptions$.first().subscribe(
            mapOptions => resolve(mapOptions)
         );
      })
   }

   public initMap() {
      console.log('INIT MAP');
      return Promise.all([
            this.loadAPI(),
            this.initMapOptions()
         ])
         .then(result => {
            let mapsApi = result[0]['maps'];
            let additionalMapOptions =  {
               mapTypeControlOptions: {
                  style: mapsApi.MapTypeControlStyle.DEFAULT,
                  position: mapsApi.ControlPosition.TOP_RIGHT
               }
            };
            this.changeMapOptions(additionalMapOptions);
            this.map = new mapsApi.Map(document.getElementById('map'), this.mapOptions);
         })
   }

   public updateMarkers(newPoint): void {
      this.resetMap();
      this.markers = this.addMarkers(this.map, newPoint);

      if (this.markers.length > 1) {
         this.markerClusterer = this.setMarkerCluster(this.map, this.markers);
      }
   }

   public hideCurrentMarkers(): void {
      this.clearMarkersAndClusterer(this.markerClusterer);
   }

   public showCurrentMarkers(): void {
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

   public moveToLocation(): void {

   }

}

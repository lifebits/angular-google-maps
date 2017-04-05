import {Injectable, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subject} from "rxjs";

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

   public mapIsCreated: true | false = false;

   public currentLocation: String; // if the points are returned by location

   constructor(
      private ngZone: NgZone,
      private router: Router,
      private route: ActivatedRoute) {
      super();

      this.mapOptions$.subscribe(mapOptions => {
         if (this.mapIsCreated) {
            this.focusToLocation();
         }
         //console.log('Map Options Changes: ', mapOptions);
      });
   }

   public changeMapOptions(newOptions?: MapOptionsConfig): void {
      if (newOptions) {
         this.mapOptions = Object.assign(this.mapOptions, newOptions);
      }
      this.mapOptionsSource.next(this.mapOptions);
   }

   public initMapOptions(): Promise<MapOptionsConfig> {
      return new Promise(resolve => {
         this.mapOptions$.first().subscribe(
            mapOptions => resolve(mapOptions)
         );
      })
   }

   public initMap() {
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
            this.mapIsCreated = true;
         })
   }

   public updateMarkers(newPoint): void {
      this.resetMap();
      this.markers = this.addMarkers(this.map, newPoint, this.getMarkerInfo.bind(this));

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

   public focusToLocation(): void {
      if (this.map.zoom != this.mapOptions.zoom) {
         this.map.setZoom(this.mapOptions.zoom);
      }
      this.map.panTo(this.mapOptions.center);
   }

   public mapAddMarkers(pointList) {
      this.markers = this.addMarkers(this.map, pointList, this.getMarkerInfo.bind(this));
      return this.markers;
   }

   public getMarkerInfo(marker) {
      this.ngZone.run(() => {
         this.router.navigate([marker.item.location, 'place', marker.item.rank], { relativeTo: this.route });
      });

   }

}

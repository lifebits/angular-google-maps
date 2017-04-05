import {Injectable} from '@angular/core';
import {GoogleAPI, MapOptionsConfig, MapPoint} from './maps.interface';

const MarkerClusterer = require('node-js-marker-clusterer');

const API_INIT = 'onMapApiLoaded';
const API_KEY = 'AIzaSyAcuLH_XAAW8Ggg-9YN_Y_8QYcYp0Qa5fU';
const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&language=ru&callback=${API_INIT}`;


@Injectable()
export class MapsService {

   public googleAPI: GoogleAPI;

   private markersIconList = {
      smallCity: 'map-residential-places',
      mediumCity: 'map-lounges',
      largeCity: 'map-commercial-places',
      megaCity: 'map-hotels'
   };

   protected defaultMapsOptions: MapOptionsConfig = {
      center: {lat: 37.328202, lng: -95.864808},
      zoom: 5,
      scrollwheel: true
   };

   constructor() {}


   public addMarkers(map, pointList: MapPoint[], markerClickEvent?: Function) {
      let markers: any[] = [];
      pointList.forEach(place => {
         let marker = new this.googleAPI.maps.Marker({
            position: {lat: place.latitude, lng: place.longitude},
            map: map,
            title: place.city,
            icon: `assets/icon/maps/${this.getMarkerIcon(place.population)}.png`,
            //animation: this.googleAPI.maps.Animation.DROP,
            item: {
               location: place.city.toLowerCase().replace(/\s/g, ''),
               state: place.state,
               rank: place.rank
            }
         });

         if (markerClickEvent) {
            marker.addListener('click', function() {
               markerClickEvent(this);
            });
         }

         markers.push(marker);
      });

      return markers;
   }

   public setMarkerCluster(map, markers) {
      let options = {
         imagePath: 'assets/icon/maps/m',
         gridSize: 50,
       };
       return new MarkerClusterer(map, markers, options);
   }

   protected clearMarkers(markers: any[]): void {
      this.setMapOnAll(null, markers);
   }

   protected showMarkers(map: any, markers: any[]): void {
      this.setMapOnAll(map, markers);
   }

   protected clearMarkersAndClusterer(markerClusterer): void {
      markerClusterer.clearMarkers();
   }

   private setMapOnAll(map: any, markers: any[]): void {
      markers.forEach(marker => {
         marker.setMap(map);
      });
   }

   protected loadAPI(): Promise<any> {
      return new Promise(resolve => {
         window[API_INIT] = () => {
            console.log('google maps API loaded');
            this.googleAPI = window['google'];
            resolve(this.googleAPI);
            delete window[API_INIT];
         };
         this.loadScript();
      })
   }

   private loadScript(): void {
      console.log('Loading Map API..');
      let node = document.createElement('script');
      node.async = true;
      node.src = API_URL;
      node.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(node);
   }

   protected getMarkerIcon(population: string): string {
      let _population: number = +population;

      if (_population <= 80000) {
         return this.markersIconList.smallCity
      }

      if (_population > 80000 && _population < 400000) {
         return this.markersIconList.mediumCity
      }

      if (_population > 400000 && _population < 800000) {
         return this.markersIconList.largeCity;
      }

      if (_population > 800000) {
         return this.markersIconList.megaCity
      }
   }

}

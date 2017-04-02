import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute} from  '@angular/router';
import {MainMapService} from "../main-map/main-map.service";
import {MapOptionsConfig, MapPoint, Coordinates} from "../maps.interface";


@Component({
   selector: 'app-main-maps-navigate',
   templateUrl: 'main-map-navigate.component.html',
   styleUrls: ['main-map-navigate.component.scss']
})
export class MainMapsNavigateComponent implements OnInit {

   constructor(
      private http: Http,
      private route: ActivatedRoute,
      private mainMap: MainMapService) {
   }

   ngOnInit() {
      this.route.params
         .subscribe(params => {
            console.log('main-map-navigate: ', params);
            this.getLocationCoords('chicago')
               .then(locationCoords => {
                  let mapOptions: MapOptionsConfig = {center: locationCoords};
                  return this.mainMap.changeMapOptions(mapOptions);
               })
         })
   }

   private getLocationCoords(locationName: string): Promise<Coordinates> {
      return this.http.get('./assets/mocks/cities.json')
         .toPromise()
         .then(response => response.json())
         .then(cities => this.updateCitiesList(cities))
         .then(updatedCities => updatedCities.find(p => p._searchIndex === locationName))
         .then(findLocations => {
            return {
               lat: findLocations.latitude,
               lng: findLocations.longitude
            };
         })
   }

   private updateCitiesList(citiesList) {
      citiesList.forEach(item => {
         item['_type'] = 'city';
         item['_searchIndex'] = item.city.toLowerCase().replace(/\s/g, '');
      });
      return citiesList;
   }

}

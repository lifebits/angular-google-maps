import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute} from  '@angular/router';
import {MainMapService} from "../main-map/main-map.service";
import {MapOptionsConfig, Coordinates} from "../maps.interface";


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
            this.mainMap.currentLocation = params.city;
            this.findLocation(params.city)
               .then(location => this.getMainMapOptions(location))
               .then(prepareOptions => this.mainMap.changeMapOptions(prepareOptions));
         })
   }

   private findLocation(locationName): Promise<any> {
      return this.http.get('./assets/mocks/cities.json')
         .toPromise()
         .then(response => response.json())
         .then(cities => this.updateCitiesList(cities))
         .then(updatedCities => updatedCities.find(p => p._searchIndex === locationName))
   }

   private getMainMapOptions(location): MapOptionsConfig {
      let prepareOptions: MapOptionsConfig = {};
      prepareOptions.center = {
         lat: location.latitude,
         lng: location.longitude
      };
      prepareOptions.zoom = (location._type === 'location') ? 5 : 10;
      return prepareOptions;
   }

   private updateCitiesList(citiesList) {
      citiesList.forEach(item => {
         item['_type'] = (item.rank == 0) ? 'location' : 'city';
         item['_searchIndex'] = item.city.toLowerCase().replace(/\s/g, '');
      });
      return citiesList;
   }

}

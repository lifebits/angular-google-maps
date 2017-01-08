import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {MapPoint} from '../maps/maps.interface';
import {SearchOptionsConfig} from  './search.interface';
import {MainMapService} from '../maps/main-map.service';
import {SearchService} from './search.service';

const concat = require('lodash.concat');

@Component({
   selector: 'app-main-search',
   templateUrl: './main-search.component.html',
   styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

   public query: string = '';
   public quickSearchResult: MapPoint[];

   constructor(
      private http: Http,
      public searchService: SearchService,
      private mainMapService: MainMapService) { }

   ngOnInit() {

   }

   public quickSearchQuery(event: KeyboardEvent): void {
      this.query = event.target['value'];
      this.getPlacesList()
         .then(placeList => placeList.filter(item => ~item._searchIndex.indexOf(this.query.toLowerCase())))
         .then(result => (!!this.query && result.length != 0) ? this.arrayReduction(result, 6) : [])
         .then(reductionResult => this.quickSearchResult = this.searchService.highlightingPartsFound(reductionResult, this.query))
   }

   public searchQuery(): void {
      this.getCityList()
         .then(cityList => this.updateCitiesList(cityList))
         .then(cityList => cityList.filter(item => ~item._searchIndex.indexOf(this.query.toLowerCase())))
         .then(filteredCity => this.searchService.setSearchResult(filteredCity))
         .then(filteredCity => this.setMarkersOnMap(filteredCity))
   }

   public resetSearch(): void {
      this.query = '';
      this.quickSearchResult = undefined;
      this.mainMapService.resetMap();
      this.searchService.resetSearchResult();
   }

   public setMarkerOnMap(item): void {
      this.quickSearchResult = [];
      let itemsFound = [];

      if (item._type === 'city') {
         this.query = item.city;
         itemsFound.push(item);
      }
      if (item._type === 'state') {
         this.query = item.stateName;
         itemsFound = item.cityList;
      }

      this.searchService.setSearchResult(itemsFound);
      this.mainMapService.updateMarkers(itemsFound);
   }

   public setMarkersOnMap(items: MapPoint[]): void {
      this.quickSearchResult = [];
      this.mainMapService.updateMarkers(items);
   }

   public getIconPlaceUrl(placeType: string): string {
      let iconType = {
         city: 'city',
         state: 'markers'
      };
      return `assets/icon/maps/${iconType[placeType]}.png`;
   }

   public toggleMapsPointsDisplay() {
      let isActive = this.searchService.options.mapsPointsDisplay;
      (isActive) ? this.mainMapService.hideCurrentMarkers() : this.mainMapService.showCurrentMarkers();
      this.searchService.changeSearchOptions({mapsPointsDisplay: !isActive});
   }

   public toggleSearchListType(previewType) {
      let options: SearchOptionsConfig = {};
      (previewType === this.searchService.options.previewType)
         ? options.previewDisplay = !this.searchService.options.previewDisplay
         : options.previewType = previewType;
      if (previewType != this.searchService.options.previewType && !this.searchService.options.previewDisplay) {
         options.previewDisplay = true;
      }
      this.searchService.changeSearchOptions(options);
   }

   private arrayReduction(array: any[], length: number): any[] {
      return array.splice(0, length);
   }


   private getCityList(): Promise<MapPoint[]> {
      return this.http.get('./assets/mocks/cities.json')
         .toPromise()
         .then(response => response.json())
   }

   private getPlacesList(): Promise<MapPoint[]> {
      return this.getCityList()
         .then(citiesList => {
            let stateList = this.getStateList(citiesList);
            citiesList = this.updateCitiesList(citiesList);
            return concat(stateList, citiesList);
         })
   }

   private updateCitiesList(citiesList) {
       citiesList.forEach(item => {
         item['_type'] = 'city';
         item['_searchIndex'] = item.city.toLowerCase();
      });
      return citiesList;
   }

   private getStateList(citiesList) {
      let stateList = [];
      citiesList.forEach((item) => {
         let stateName = item.state;
         let state = checkStateInStateList(stateName);

         if (state === -1) {
            let newState = {
               _type: 'state',
               _searchIndex: stateName.toLowerCase(),
               stateName: stateName,
               cityList: []
            };
            newState.cityList.push(item);
            stateList.push(newState);
         } else {
            stateList[state]['cityList'].push(item);
         }
      });
      return stateList;

      function checkStateInStateList(stateName) {
         let foundState = stateList.filter((item) => {
            return item.stateName === stateName;
         });
         return (foundState.length != 0) ? stateList.indexOf(foundState[0]) : -1;
      }
   }


}
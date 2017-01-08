import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {MapPoint} from '../maps/maps.interface';
import {SearchOptionsConfig} from  './search.interface';


@Injectable()
export class SearchService {

   public options: SearchOptionsConfig = {
      previewDisplay: false,
      mapsPointsDisplay: true,
   };

   public searchResult: any[] = [];

   private searchOptionsSource = new Subject<SearchOptionsConfig>();
   searchOptions$ = this.searchOptionsSource.asObservable();

   private searchResultSource = new Subject();
   searchResult$ = this.searchResultSource.asObservable();

   //constructor() {}


   public changeSearchOptions(options: SearchOptionsConfig) {
      this.options = Object.assign(this.options, options);
      this.searchOptionsSource.next(this.options);
   }

   public setSearchResult(items: any[]) {
      this.searchResult = items;
      this.searchResultSource.next(this.searchResult);
      return this.searchResult;
   }

   public resetSearchResult(): void {
      this.searchResult = [];
      this.searchResultSource.next(this.searchResult);
   }


   public highlightingPartsFound(searchResult: MapPoint[], searchText: string) {
      for (let item of searchResult) {
         let setStart = item._searchIndex.indexOf(searchText);
         let setEnd = item._searchIndex.indexOf(searchText) + searchText.length;
         let count = -1;

         item._title = '';

         for (let char of item._searchIndex) {
            count++;
            if (count == setStart) {
               item._title = item._title + '<b>';
            }
            if (count == setEnd) {
               item._title = item._title + '</b>';
            }
            item._title = item._title + char;
         }
      }
      return searchResult;
   }
}

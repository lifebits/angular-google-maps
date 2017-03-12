import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {MapPoint} from '../../+maps/maps.interface';
import {SearchService} from '../search.service';

interface pointsPreviewOptionsConfig {
   type: 'list' | 'board',
   isOpen: boolean
}

@Component({
   selector: 'app-points-preview',
   templateUrl: './points-preview.component.html',
   styleUrls: ['./points-preview.component.scss']
})
export class PointsPreviewComponent implements OnInit {

   public options: pointsPreviewOptionsConfig = {
      type: this.searchService.options.previewType,
      isOpen: this.searchService.options.previewDisplay
   };
   public pointsList: MapPoint[];
   private subscription: Subscription;

   constructor(private searchService: SearchService) {
      this.subscription = searchService.searchOptions$.subscribe(
        searchOptions => {
           this.options.type = searchOptions.previewType;
           this.options.isOpen = searchOptions.previewDisplay;
        }
      );
      this.subscription = searchService.searchResult$.subscribe(
         (searchResult: MapPoint[]) => {
            this.pointsList = searchResult;
            //console.log('Change Search Result: ', searchResult);
         }
      );
   }

   ngOnInit() {

   }

}

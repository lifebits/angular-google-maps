import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
   selector: 'app-map-point-preview',
   templateUrl: './map-point-preview.component.html',
   styleUrls: ['./map-point-preview.component.scss']
})
export class MapPointPreviewComponent implements OnInit {

   public pointId: number;

   constructor(
      private route: ActivatedRoute) {
   }

   ngOnInit() {
      this.route.params
         .subscribe(params => {
            this.pointId = params['pointId'];
            console.log('map-point-preview', params)
         })
   }

}

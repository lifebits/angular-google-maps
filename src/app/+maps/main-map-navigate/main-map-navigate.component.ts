import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from  '@angular/router';


@Component({
   selector: 'app-main-maps-navigate',
   templateUrl: 'main-map-navigate.component.html',
   styleUrls: ['main-map-navigate.component.scss']
})
export class MainMapsNavigateComponent implements OnInit {

   constructor(
      private route: ActivatedRoute) {
   }

   ngOnInit() {
      this.route.params
         .subscribe(params => console.log('main-map-navigate', params))
   }

}

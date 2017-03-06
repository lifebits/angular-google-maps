import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
   selector: 'app-about',
   templateUrl: './about.component.html',
   styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

   constructor(
      private route: ActivatedRoute) {

   }

   ngOnInit(): void {
      console.log(this.route);
      this.route.params
         .subscribe(params => console.log('route', params));
      this.route.url
         .subscribe(url => console.log('url', url));
   }

}

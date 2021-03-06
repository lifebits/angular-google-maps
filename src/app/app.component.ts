import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute, Route} from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

   constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute) {

   }

   ngOnInit() {
      /*this.router.events
         .filter(event => event instanceof NavigationEnd)
         .map(() => this.activatedRoute)
         .map(route => {
            while (route.firstChild) route = route.firstChild;
            return route;
         })
         .filter(route => route.outlet === 'primary')
         .map(route => route.params)
         .subscribe(event => {
            console.log('APP:NavigationEnd', event);
         })*/
   }

}

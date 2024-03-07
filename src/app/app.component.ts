import { Component } from '@angular/core';
// import { Route, Router } from '@angular/router';
// import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'list';

  // constructor(private router: Router) {
  //   interval(6000) // Switch image every minute
  //     .subscribe(() => {
  //       setTimeout(() => {
  //         router.navigate(['image'])
  //       }, 500); // Hide image after 5 seconds
  //     });
  // }

}

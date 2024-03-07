import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EnterDetailsComponent } from '../enter-details/enter-details.component';
import { TransferData } from 'src/app/models/transfer';
import { DetailsService } from 'src/app/services/detailsService';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private detailsService: DetailsService, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    // this.showImages();

    console.log(new Date());

    this.detailsService.getSum().subscribe(res => {
      this.sum = res;
    })

    this.detailsService.getAllCities().subscribe(res => {
      this.cities = res;
      this.lastCities = res;
      this.lastsCitiesFunc();

      this.cities.sort((a, b) => {
        return b.sum - a.sum;
      });

      this.maxCities();

      this.getParams();
      console.log("smkskdf");


    });

  }
  s: string = "";

  tr: TransferData = new TransferData("", 0, new Date());

  deletedObj: TransferData = new TransferData("", 0, new Date());

  sum: number = 0;
  stringSum = this.sum.toString();
  goal: number = 270000;

  deleteOrAddParam!: any;

  deleteOrAdd!: Boolean;
  isUpdate: boolean = false;

  city!: TransferData;

  maxesCities: TransferData[] = [];
  cities: TransferData[] = [];
  lastCities: TransferData[] = [];
  showLastCities: TransferData[] = [];
  lastCitiesName: string[] = [];

  getParams(): void {
    this.ar.queryParams.subscribe(res => {

      this.tr.sum = parseInt(res['citySum']);
      this.tr.name = res['cityName'];
      this.tr.time = new Date();

      if (res['newGoal']) {
        this.goal = parseInt(res['newGoal']);
      }

      if (res['cityName'] && res['citySum']) {
        this.sum += this.tr.sum;
        this.addCity();
        // this.lastsCitiesFunc(this.tr.name);
      } else {
        if (res['cityName']) {
          this.deletedObj.name = res['cityName'];
          this.deletededCity();
        } else {
          if (res['citySum'] && res['flag']) {
            this.deleteOrAddParam = res['flag'];
            this.deleteOrAdd = (this.deleteOrAddParam === 'true');
            if (this.deleteOrAdd) {
              this.addSum();
            }
            else {
              this.deleteSum();
            }
          }
        }
      }
    });
  }

  maxCities(): void {
    console.log(this.cities);

    for (let i = 0; i < 3; i++) {
      this.maxesCities.push(this.cities[i]);
    }
  }

  lastsCitiesFunc(): void {

    for (let i = 0; i < this.lastCities.length; i++) {
      this.lastCities[i].time = new Date(this.lastCities[i].time)
    }

    this.lastCities.sort((a, b) => {
      return b.time.getTime() - a.time.getTime();
    });

    console.log(this.lastCities);

    if (this.lastCities.length > 5) {
      this.lastCities = this.lastCities.slice(-5);
    }

  }


  showSum(): void {
    this.detailsService.getSum().subscribe(res => {
      this.sum = res;
      console.log("summmmmmmmmmm");

    })
  }

  showDetails(): void {
    this.detailsService.getAllCities().subscribe(res => {
      this.cities = res;

      this.cities.sort((a, b) => {
        return a.sum - b.sum;
      });
    })
  }

  addSum(): void {
    this.detailsService.addSum(this.tr.sum).subscribe(res => {
      console.log("adddddddddddddddd sum ," + res);
      this.showSum();
    });
  }
  deleteSum(): void {
    this.detailsService.deleteSum(this.tr.sum).subscribe(res => {
      console.log("deleteeeeeeeeeeeeeeee sum");
      this.showSum();
    });
  }

  deletededCity(): void {
    console.log("delete");
    this.detailsService.getCity(this.deletedObj.name).subscribe(res => {
      this.tr.sum = res.sum;
      this.deleteSum();

      this.detailsService.deleteCity(this.deletedObj.name).subscribe(res => {
        this.showDetails();
        console.log(this.deletedObj.name);
      });
    });
  }

  addCity(): void {
    this.sum += this.tr.sum;
    console.log(this.cities);
    this.cities.forEach(c => {
      console.log(c);
      if (c.name === this.tr.name) {
        // this.cities = this.cities.map(ci => {
        //   if (ci.name == this.tr.name) {
        //     this.tr.sum = this.tr.sum + ci.sum;
        //     return this.tr;
        //   }
        //   return ci;
        // })
        this.detailsService.updateCity(this.tr).subscribe(res => {
          this.addSum();
          this.showDetails();
          // this.lastsCitiesFunc(this.tr.name);
          this.lastsCitiesFunc();

        });
        this.isUpdate = true
      }
    });
    if (!this.isUpdate) {
      this.detailsService.addCity(this.tr).subscribe(res => {
        this.addSum();
        this.showDetails();
        this.lastsCitiesFunc();
        // this.lastsCitiesFunc(this.tr.name);
      });
      this.showDetails();
    }
  }

  // showImages(): void {
  //   while(true){
  //     setTimeout(() => {
  //       this.router.navigate(['image']);
  //     }, 5000);
  //   }
  // }












  // addCity($event: TransferData): void {
  //   // this.sum += $event.sum;
  //   // this.city = $event.name;
  //   this.cities.forEach(c => {
  //     if (c.name == this.city) {
  //       this.detailsService.updateCity($event).subscribe(res => {
  //         console.log(res);
  //       });
  //       console.log("update");
  //       this.flag = true
  //     }
  //   });
  //   if (!this.flag) {
  //     this.cities.push($event);
  //     this.detailsService.addCity($event).subscribe(res => {
  //       console.log(res);
  //     });
  //     console.log("added");

  //   }
  // }
}

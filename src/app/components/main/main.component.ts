import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
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
export class MainComponent implements OnInit ,AfterViewInit {

  constructor(private router: Router, private detailsService: DetailsService, private ar: ActivatedRoute, private elementRef: ElementRef) { }
  ngAfterViewInit(): void {
    const targetLineElement = this.elementRef.nativeElement.querySelector('#now');
    if (targetLineElement) {
      console.log('Found target element');
      console.log(targetLineElement);
      
      targetLineElement.scrollIntoView({  block: 'start', inline: 'nearest' });
      console.log('Scrolled to target element');

    }
  }

  ngOnInit(): void {
    // this.showImages();
    // this.images();

    



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
  showImage: boolean = true;

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
    this.maxesCities = this.cities.slice(0, 3);
    // for (let i = 0; i < 3; i++) {
    //   this.maxesCities.push(this.cities[i]);
    // }
  }

  lastsCitiesFunc(): void {

    for (let i = 0; i < this.lastCities.length; i++) {
      this.lastCities[i].time = new Date(this.lastCities[i].time)
    }

    this.lastCities.sort((a, b) => {
      return b.time.getTime() - a.time.getTime();
    });

    console.log(this.lastCities);

    if (this.lastCities.length > 6) {
      this.lastCities = this.lastCities.slice(-6);
    }
    // this.showDetails();

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
      this.lastCities = res;
      this.cities.sort((a, b) => {
        return a.sum - b.sum;
      });
      this.lastsCitiesFunc();
      this.maxCities();
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
        this.maxCities();
        this.lastsCitiesFunc();
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
        this.detailsService.updateCity(this.tr).subscribe(res => {
          this.addSum();
          this.showDetails();
          this.maxCities();
          this.lastsCitiesFunc();

        });
        this.isUpdate = true
      }
    });
    if (!this.isUpdate) {
      this.detailsService.addCity(this.tr).subscribe(res => {
        this.addSum();
        this.showDetails();
        this.maxCities();
        this.lastsCitiesFunc();
        // this.lastsCitiesFunc(this.tr.name);
      });
      this.showDetails();
    }
  }


  stopImages(): void {
    this.showImage = (!this.showImage);
    console.log(this.showImage);


  }






  // images(): void {
  //   setInterval(() => {
  //     this.router.navigate(['image'])
  //     console.log("image in main");

  //     // setTimeout(() => {

  //     // }, 5000);
  //   }, 30000)
  // }

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

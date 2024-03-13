import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TransferData } from 'src/app/models/transfer';
import { DetailsService } from 'src/app/services/detailsService';

@Component({
  selector: 'enter-details',
  templateUrl: './enter-details.component.html',
  styleUrls: ['./enter-details.component.scss']
})
export class EnterDetailsComponent {
  constructor(private router: Router, private detailsService: DetailsService) { }

  Addsum!: number;
  Addcity!: string;

  deletedCity: string = "";
  deletedSum!: number;

  Addsum1!: number;

  newGoal!: number;
  tr: TransferData = new TransferData("", 0, new Date());
  // tr: TransferData = {
  //   sum: 0,
  //   name: '',
  //   time: new Date()
  // };




  addCity(): void {
    this.router.navigate(['main'], { queryParams: { cityName: this.Addcity, citySum: this.Addsum } });

  }

  deleteCity(): void {
    this.router.navigate(['main'], { queryParams: { cityName: this.deletedCity } });

  }
  deleteSum(): void {
    this.router.navigate(['main'], { queryParams: { citySum: this.deletedSum, flag: false } });

  }
  addSum(): void {
    this.router.navigate(['main'], { queryParams: { citySum: this.Addsum1, flag: true } });

  }

  addNewGoal(): void {
    this.router.navigate(['main'], { queryParams: { newGoal: this.newGoal } });
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    this.detailsService.addImage(formData).subscribe(res => {
      console.log(res.fileName);
    });
  }


  deleteImage(): void {

  }
}




// @Output() onchoose: EventEmitter<any> = new EventEmitter<any>();
// addCity(): void {
//   this.tr.sum = this.sum2;
//   this.tr.name = this.city2;
//   this.onchoose.emit(this.tr)

// }



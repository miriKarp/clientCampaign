import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent {

  constructor() {
    interval(6000) // Switch image every minute
      .subscribe(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
        this.showImage = true;

        setTimeout(() => {
          this.showImage = false;
        }, 500); // Hide image after 5 seconds
      });
  }

  imageUrls: string[] = ["../../../assets/logo.JPG", "../../../assets/2.jpg", "../../../assets/3.jpg"];
  currentImageIndex: number = 0;
  showImage: boolean = true;

  showImages(): void {

  }

}

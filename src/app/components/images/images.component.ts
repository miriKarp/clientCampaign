import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
    setInterval(() => {
      this.showImage = true;
      this.currentImage = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)]; // Change image randomly
      setTimeout(() => {
        this.showImage = false; // Hide image after 5 seconds
      }, 500);
    }, 6000)
  }

  imageUrls: string[] = ["../../../assets/logo.JPG", "../../../assets/2.jpg", "../../../assets/3.jpg"];
  currentImageIndex: number = 0;
  currentImage: string = '';
  showImage: boolean = false;

  showImages(): void {

  }


}

import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { DetailsService } from 'src/app/services/detailsService';

@Component({
  selector: 'images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  constructor(private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.getImage();
    setInterval(() => {
      this.showImage = true;
      this.currentImage = this.imageUrls[this.myIndex];
      console.log(this.currentImage);

      this.forIndex();
      setTimeout(() => {
        this.showImage = false; // Hide image after 5 seconds
      }, 5000);
    }, 30000)
  }


  imageUrls: string[] = [];
  images: string[] = [];
  currentImageIndex: number = 0;
  currentImage: string = '';
  showImage: boolean = false;
  myIndex: number = 0;


  getImage(): void {
    this.detailsService.getImage().subscribe((res) => {
      this.images = res;
      for (let i = 0; i < this.images.length; i++) {
        this.imageUrls.push('../../../assets/Uploads/' + this.images[i]);
      }
    }, (err => {
      console.log("sorry  " + err);
    }))
  }

  forIndex() {
    if (this.myIndex < this.imageUrls.length-1) {
      this.myIndex++;
    }
    else {
      this.myIndex = 0;
    }
  }


}

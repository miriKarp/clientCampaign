import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { DetailsService } from 'src/app/services/detailsService';

@Component({
  selector: 'images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  constructor(private router: Router, private detailsService: DetailsService) { }

  ngOnInit(): void {
    this.getImage();
    setInterval(() => {
      this.showImage = true;
      this.currentImage = this.imageUrls[this.myIndex];
      console.log(this.currentImage);

      this.forIndex();
      setTimeout(() => {
        this.showImage = false; // Hide image after 5 seconds
      }, 15000);
    }, 60000)



    // this.getImage();

    // this.showImage = true;
    // this.currentImage = this.imageUrls[this.myIndex];
    // console.log(this.currentImage);

    // this.forIndex();
    // setTimeout(() => {
    //   console.log("image in image");
    //   this.router.navigate(['main']);
    // }, 5000);

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
    if (this.myIndex < this.imageUrls.length - 1) {
      this.myIndex++;
    }
    else {
      this.myIndex = 0;
    }
  }



}

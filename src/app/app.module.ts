import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { EnterDetailsComponent } from './components/enter-details/enter-details.component';
import { ImagesComponent } from './components/images/images.component';
import { CityComponent } from './components/city/city.component'


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EnterDetailsComponent,
    ImagesComponent,
    CityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

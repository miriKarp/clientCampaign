import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { EnterDetailsComponent } from './components/enter-details/enter-details.component';
import { ImagesComponent } from './components/images/images.component';

const routes: Routes = [
  { path: '', component: EnterDetailsComponent },
  { path: 'main', component: MainComponent },
  { path: 'main/:cityName', component: MainComponent },
  { path: 'main/:newGoal', component: MainComponent },
  { path: 'main/:citySum', component: MainComponent },
  { path: 'main/:citySum/:flag', component: MainComponent },
  { path: 'main/:cityName/:citySum', component: MainComponent },
  { path: 'details', component: EnterDetailsComponent },
  { path: 'image', component: ImagesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

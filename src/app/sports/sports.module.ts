import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportsPageRoutingModule } from './sports-routing.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { SportsPage } from './sports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
    SportsPageRoutingModule
  ],
  declarations: [SportsPage]
})
export class SportsPageModule {}

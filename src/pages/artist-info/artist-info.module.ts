import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtistInfoPage } from './artist-info';

@NgModule({
  declarations: [
    ArtistInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtistInfoPage),
  ],
})
export class ArtistInfoPageModule {}

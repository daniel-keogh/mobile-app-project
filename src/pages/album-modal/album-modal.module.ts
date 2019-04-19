import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumModalPage } from './album-modal';

@NgModule({
  declarations: [
    AlbumModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumModalPage),
  ],
})
export class AlbumModalPageModule {}

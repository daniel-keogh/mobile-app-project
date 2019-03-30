import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-artist-info',
  templateUrl: 'artist-info.html',
})
export class ArtistInfoPage {

  artist: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.artist = navParams.get('artist');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtistInfoPage');
  }

}

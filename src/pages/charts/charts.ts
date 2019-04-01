import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopArtistsProvider } from '../../providers/top-artists/top-artists';

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {

  topArtists: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public topArtistsProvider: TopArtistsProvider) {
  }

  ionViewDidLoad() {
    this.topArtistsProvider.getTopArtists().subscribe((data) => {
      this.topArtists = data.artists.artist;
    });
  }

}

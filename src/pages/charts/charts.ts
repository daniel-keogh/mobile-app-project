import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopTracksProvider } from '../../providers/top-tracks/top-tracks';

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {

  topTracks: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public topTracksProvider: TopTracksProvider) {
  }

  ionViewDidLoad() {
    this.topTracksProvider.getTopTracks().subscribe((data) => {
      this.topTracks = data.tracks.track;
    });
  }

}

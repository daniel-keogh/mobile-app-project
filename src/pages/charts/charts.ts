import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChartsProvider } from '../../providers/charts/charts';
import { ArtistInfoPage } from '../artist-info/artist-info';

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {

  topArtists: any = [];
  topTracks: any = [];
  chartType: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chartsProvider: ChartsProvider) {
  }

  ionViewDidLoad() {
    this.chartType = "tracks";
    this.loadCharts();
  } 

  loadCharts() {
    this.chartsProvider.getTopArtists().subscribe((data) => {
      this.topArtists = data.artists.artist;
    });

    this.chartsProvider.getTopTracks().subscribe((data) => {     
      this.topTracks = data.tracks.track;
    });
  }

  viewArtist(artist: string) {
    this.navCtrl.push(ArtistInfoPage, {
      artist : artist
    });
  }
}

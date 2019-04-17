import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Select } from 'ionic-angular';
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

  @ViewChild('selectChartType') select: Select;
  constructor(public navCtrl: NavController, public navParams: NavParams, public chartsProvider: ChartsProvider) {
  }

  ionViewDidLoad() {
    this.chartType = "Tracks";
    this.loadCharts();
  } 

  // Reference: Paresh Gami - https://stackoverflow.com/a/48656554
  openSelect() {
      this.select.open();
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

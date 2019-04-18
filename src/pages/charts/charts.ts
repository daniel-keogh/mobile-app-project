import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Select, ToastController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public chartsProvider: ChartsProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.chartType = "Tracks";
    this.loadCharts();
  } 

  // Reference: Paresh Gami - https://stackoverflow.com/a/48656554
  openSelect() {
      this.select.open();
  }

  refreshCharts(refresher) {
    if (this.topArtists == "" && this.topTracks == "") {
      setTimeout(() => {
        this.loadCharts();
        refresher.complete();
      }, 2000);
    }
    else
      refresher.complete();
  }

  loadCharts() {
    this.chartsProvider.getTopTracks().subscribe((data) => {     
      this.topTracks = data.tracks.track;

      this.chartsProvider.getTopArtists().subscribe((data) => {
        this.topArtists = data.artists.artist;
      });
    }, err => {
      this.refreshFailedToast();
    });
  }

  refreshFailedToast() {
    let toast = this.toastCtrl.create({
      message: "Failed to load charts.",
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  viewArtist(artist: string) {
    this.navCtrl.push(ArtistInfoPage, {
      artist : artist
    });
  }
}

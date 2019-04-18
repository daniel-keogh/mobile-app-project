import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ChartsProvider } from '../../providers/charts/charts';
import { ArtistInfoPage } from '../artist-info/artist-info';

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {

  topTracks: any = [];
  playlistID: number;
  countryPlaylists: object;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public chartsProvider: ChartsProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.chartsProvider.getCountries().subscribe((file) => {
      this.countryPlaylists = file.country_charts.country;
    });
    
    this.playlistID = this.chartsProvider.getDefaultPlaylistID(); 
    this.loadDeezerCharts();
  } 

  loadDeezerCharts() {
    this.chartsProvider.getCharts(this.playlistID).subscribe((data) => {
      this.topTracks = data.data;
    }, err => {
      this.refreshFailedToast();
    });
  }

  refreshCharts(refresher) {
    setTimeout(() => {
      this.loadDeezerCharts();
      refresher.complete();
    }, 2000);
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

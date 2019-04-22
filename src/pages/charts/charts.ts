import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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
  countryPlaylists: any = [];
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public chartsProvider: ChartsProvider, private toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.chartsProvider.getCountries().subscribe((file) => {
      this.countryPlaylists = file.country_charts.country;  
    }, err => {}, () => {
      // Search for the users locale and find which playlist to use for the charts.
      this.chartsProvider.searchForLocale(this.countryPlaylists);
      this.playlistID = this.chartsProvider.getDefaultPlaylistID(); 
      
      this.loadDeezerCharts();
    }); 
  } 

  loadDeezerCharts() {
    const loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.chartsProvider.getCharts(this.playlistID).subscribe((data) => {
      this.topTracks = data.data;
      loader.dismiss();
    }, err => {
      loader.dismiss();
      this.refreshFailedToast();
    });
  }

  refreshCharts(refresher) {
    setTimeout(() => {
      this.chartsProvider.getCharts(this.playlistID).subscribe((data) => {
        this.topTracks = data.data;
      }, err => {
        this.refreshFailedToast();
      });
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
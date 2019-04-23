import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { ChartsProvider } from '../../providers/charts/charts';
import { OpenExternallyProvider } from '../../providers/open-externally/open-externally';
import { ArtistInfoPage } from '../artist-info/artist-info';

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {

  charts: any = [];
  countries: any = [];
  playlistID: number;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private chartsProvider: ChartsProvider, private toastCtrl: ToastController, private loadingCtrl: LoadingController, private openExternallyProvider: OpenExternallyProvider ) {
  }

  ionViewDidLoad() {
    this.chartsProvider.getCountries().subscribe((file) => {
      this.countries = file.country_charts.country;  
    }, () => {}, () => {
      // Search for the users locale and find which playlist to use for the charts.
      this.playlistID = this.chartsProvider.getDefaultPlaylistID(this.countries);  
      this.loadChartInformation();
    }); 
  } 

  loadChartInformation() {
    const loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    loader.present();

    this.chartsProvider.getCharts(this.playlistID).subscribe((data) => {
      this.charts = data.data;
    }, () => {
      this.refreshFailedToast();
      loader.dismiss();
    }, () => {
      loader.dismiss();
    });
  }

  refreshCharts(refresher) {
    setTimeout(() => {
      this.chartsProvider.getCharts(this.playlistID).subscribe((data) => {
        this.charts = data.data;
      }, () => {
        this.refreshFailedToast();
        refresher.complete();
      }, () => {
        refresher.complete();
      });
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

  openExternally(artist: string, track: string) {
    this.openExternallyProvider.presentOpenExternallyActionSheet(artist, track);
  }

  viewArtist(artist: string) {
    this.navCtrl.push(ArtistInfoPage, {
      artist : artist
    });
  }
}
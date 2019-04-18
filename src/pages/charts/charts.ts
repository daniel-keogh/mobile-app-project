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

  countryPlaylists: object = 
  [{"name": "Algeria", "id": 1362501015},{"name": "Argentina", "id": 1279119721},{"name": "Australia", "id": 1313616925},{"name": "Austria", "id": 1313615765},{"name": "Belgium", "id": 1266968331},
  {"name": "Bolivia", "id": 1362495515},{"name": "Brazil", "id": 1111141961},{"name": "Canada", "id": 1652248171},{"name": "Chile", "id": 1279119121},{"name": "Colombia", "id": 1116188451},
  {"name": "Costa Rica", "id": 1313618455},{"name": "Croatia", "id": 1266971131},{"name": "Czech Republic", "id": 1266969571},{"name": "Denmark", "id": 1313618905},{"name": "Equador", "id": 1362501235},
  {"name": "Eqypt", "id": 1362501615},{"name": "El Salvador", "id": 1362523615},{"name": "Estonia", "id": 1221037201},{"name": "Finland", "id": 1221034071},{"name": "France", "id": 1109890291},
  {"name": "Germany", "id": 1111143121},{"name": "Guatamala", "id": 1279118671},{"name": "Honduras", "id": 1116190301},{"name": "Hungary", "id": 1362506695},{"name": "Indonesia", "id": 1116188761},
  {"name": "Ireland", "id": 1313619455},{"name": "Italy", "id": 1116187241},{"name": "Jamaica", "id": 1362508575},{"name": "Japan", "id": 1362508955},{"name": "Jordan", "id": 1362508765},
  {"name": "Latvia", "id": 1221037511},{"name": "Lebanon", "id": 1362511155},{"name": "Lithuania", "id": 1221037371},{"name": "Malaysia", "id": 1362515675},{"name": "Mexico", "id": 1111142361},
  {"name": "Morocco", "id": 1362512715},{"name": "Netherlands", "id": 1266971851},{"name": "Norway", "id": 1313619885},{"name": "Paraguay", "id": 1362520135},{"name": "Peru", "id": 1362518525},
  {"name": "Philippines", "id": 1362518895},{"name": "Poland", "id": 1266972311},{"name": "Portugal", "id": 1362519755},{"name": "Romania", "id": 1279117071},{"name": "Russia", "id": 1116189381},
  {"name": "Saudi Arabia", "id": 1362521285},{"name": "Senegal", "id": 1362523075},{"name": "Serbia", "id": 1266972981},{"name": "Singapore", "id": 1313620765},{"name": "Slovakia", "id": 1266973701},
  {"name": "Slovenia", "id": 1362522355},{"name": "South Africa", "id": 1362528775},{"name": "South Korea", "id": 1362510315},{"name": "Spain", "id": 1116190041},{"name": "Sweden", "id": 1313620305},
  {"name": "Switzerland", "id": 1313617925},{"name": "Thailand", "id": 1362524475},{"name": "Tunisia", "id": 1362525375},{"name": "Turkey", "id": 1116189071},{"name": "UK", "id": 1111142221},
  {"name": "Ukraine", "id": 1362526495},{"name": "United Arab Emirates", "id": 1362491345},{"name": "USA", "id": 1313621735},{"name": "Venezuala", "id": 1362527605},{"name": "Worldwide", "id": 3155776842}];
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public chartsProvider: ChartsProvider, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.playlistID = 3155776842; // worldwide by default
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

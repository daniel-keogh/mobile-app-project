import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists'

@IonicPage()
@Component({
  selector: 'page-artist-info',
  templateUrl: 'artist-info.html',
})
export class ArtistInfoPage {

  artist: string;
  artistInfo: any = [];
  similarArtists: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private similarArtistsProvider: SimilarArtistsProvider) {
    this.artist = navParams.get('artist');
  }

  ionViewWillEnter() {
    this.similarArtistsProvider.getArtistInfo(this.artist).subscribe((data) => {
      this.artistInfo = data.artist;
    });

    this.similarArtistsProvider.getSimilar(this.artist).subscribe((data) => {
      this.similarArtists = data.similarartists.artist;
    });
  }

}

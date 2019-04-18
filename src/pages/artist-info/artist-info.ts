import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists'

@IonicPage()
@Component({
  selector: 'page-artist-info',
  templateUrl: 'artist-info.html',
})
export class ArtistInfoPage {

  segment: any;
  artist: string;
  artistImg: any;
  artistInfo: any = [];
  bio: any;
  bioSummary: any = [];
  bioContent: any = [];
  similarArtists: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private similarArtistsProvider: SimilarArtistsProvider) {
    this.artist = navParams.get('artist');
  }

  ionViewDidLoad() {
    this.segment = "thisArtist";

    this.similarArtistsProvider.getArtistInfo(this.artist).subscribe((data) => {
      this.artistInfo = data.artist;
      this.artistImg = data.artist.image[4]['#text'];
      this.bioContent = data.artist.bio.content;
      this.bioSummary = data.artist.bio.summary;
      this.bio = this.bioSummary;
    });

    this.similarArtistsProvider.getSimilar(this.artist).subscribe((data) => {
      this.similarArtists = data.similarartists.artist;
    });
  }

  showMoreLess() {
    this.bio = (this.bio == this.bioSummary) ? this.bioContent : this.bioSummary;
  }

}

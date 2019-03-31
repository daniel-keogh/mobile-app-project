import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArtistInfoPage } from '../artist-info/artist-info';
import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists'
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})

export class SearchResultsPage {

  searchQuery: string;
  artists: any = [];

  constructor(public navCtrl: NavController, private similarArtistsProvider: SimilarArtistsProvider, public navParams: NavParams, private storage: Storage) {
    this.searchQuery = navParams.get('userInput');
  }

  ionViewDidLoad() {
    this.similarArtistsProvider.getSearchResults(this.searchQuery).subscribe((data) => {
      this.artists = data.results.artistmatches.artist;
    });
  }

  // Separate every thousandth digit with a comma.
  commaSeparate(numListeners: string) : string {
    // Source: Elias Zamaria - https://stackoverflow.com/a/2901298
    return numListeners.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  viewArtist(artistIndex: number) {
    let artistName: string = this.artists[artistIndex].name;

    this.navCtrl.push(ArtistInfoPage, {
      artist : artistName
    });
  }

  viewSearchResults(userInput : string) {

    if (userInput != "") {
      this.searchQuery = userInput;
      this.ionViewDidLoad();
      
      // TODO - add the item to seach history
    }
  }
}

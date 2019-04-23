import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ArtistInfoPage } from '../artist-info/artist-info';
import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists'
import { SearchHistoryProvider } from '../../providers/search-history/search-history';
import { AbbreviateNumbersProvider } from '../../providers/abbreviate-numbers/abbreviate-numbers';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})

export class SearchResultsPage {

  searchQuery: string;
  saveHistory: boolean;
  artists: any = [];
  noResults: boolean = false;

  constructor(public navCtrl: NavController, private similarArtistsProvider: SimilarArtistsProvider, public navParams: NavParams, private searchHistoryProvider: SearchHistoryProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private abbreviateNumbersProvider: AbbreviateNumbersProvider) {
    this.searchQuery = navParams.get('userInput');
    this.saveHistory = navParams.get('saveHistory');
  }

  ionViewDidEnter() {
    this.loadResults();
  }

  loadResults() {
    const loader = this.loadingCtrl.create({
      content: "Loading...",
      dismissOnPageChange: true
    });
    loader.present();

    this.similarArtistsProvider.getSearchResults(this.searchQuery).subscribe((data) => {
      this.artists = data.results.artistmatches.artist;
      loader.dismiss();

      if (this.artists == "") {
        this.noResults = true;
        this.presentToast();
      }
      else {
        this.noResults = false;
      }
    }, err => {
      loader.dismiss();
      this.noResults = true;
      this.presentToast();
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "No results found for \""+ this.searchQuery +"\".",
      duration: 3000,
    });
    toast.present();
  }

  abbreviateNumListeners(numListeners: any): string {
    return this.abbreviateNumbersProvider.abbreviateNumber(numListeners);
  }

  viewArtist(artistName: string) {
    this.navCtrl.push(ArtistInfoPage, {
      artist : artistName
    });
  }

  viewSearchResults(userInput: string) {
    if (userInput != "") {
      this.searchQuery = userInput;
      this.loadResults();
      
      // add the item to search history
      if (this.saveHistory)
        this.searchHistoryProvider.addItemToHistory(userInput);
    }
  }
}

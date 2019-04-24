import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ArtistInfoPage } from '../artist-info/artist-info';
import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists'
import { SearchHistoryProvider } from '../../providers/search-history/search-history';
import { AbbreviateNumbersProvider } from '../../providers/abbreviate-numbers/abbreviate-numbers';

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})

export class SearchResultsPage {

  searchQuery: string;
  saveHistory: boolean;
  artists: any = [];
  noResults: boolean;

  constructor(public navCtrl: NavController, private similarArtistsProvider: SimilarArtistsProvider, public navParams: NavParams, private searchHistoryProvider: SearchHistoryProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private abbreviateNumbersProvider: AbbreviateNumbersProvider) {
    this.searchQuery = navParams.get('userInput');
    this.saveHistory = navParams.get('saveHistory'); // get the value of the toggle on the home page (for storing searches on this page)
  }

  ionViewDidEnter() {
    this.loadResults();
  }

  loadResults() {
    const loader = this.loadingCtrl.create({
      content: "Loading...",
      dismissOnPageChange: true
    });
    
    loader.present().then(() => {
      this.similarArtistsProvider.getSearchResults(this.searchQuery).subscribe((data) => {
        this.artists = data.results.artistmatches.artist;

        if (this.artists == "") {
          this.presentNoResultsFoundToast();
        }
        else {
          this.noResults = false;
        }
      }, () => {
        loader.dismiss();
        this.presentNoResultsFoundToast();
      }, () => {
        loader.dismiss();
      });
    });
  }

  presentNoResultsFoundToast() {
    let toast = this.toastCtrl.create({
      message: "No results found for \""+ this.searchQuery +"\".",
      duration: 3000,
    });
    this.noResults = true;
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
      this.loadResults(); // search for the new query
      
      // add the item to search history
      if (this.saveHistory)
        this.searchHistoryProvider.addItemToHistory(userInput);
    }
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArtistInfoPage } from '../artist-info/artist-info';
import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists'
import { SearchHistoryProvider } from '../../providers/search-history/search-history';

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

  constructor(public navCtrl: NavController, private similarArtistsProvider: SimilarArtistsProvider, public navParams: NavParams, private searchHistoryProvider: SearchHistoryProvider, public toastCtrl: ToastController) {
    this.searchQuery = navParams.get('userInput');
    this.saveHistory = navParams.get('saveHistory');
  }

  ionViewDidLoad() {
    this.similarArtistsProvider.getSearchResults(this.searchQuery).subscribe((data) => {
      this.artists = data.results.artistmatches.artist;

      if (this.artists == "")
        this.presentToast();
    });
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: "No results found for \""+ this.searchQuery +"\".",
      duration: 3000,
    });
    toast.present();
  }

  abbreviateNumListeners(numListeners: any) : string {
    // Based on: https://gist.github.com/tobyjsullivan/96d37ca0216adee20fa95fe1c3eb56ac - tobyjsullivan
    let newValue = numListeners;
    const suffixes = ["", "K", "M", "B","T"];  
    let suffixNum = 0;

    if (numListeners < 1000) {
      return numListeners;
    }
    else {
      while (newValue >= 1000) {
        newValue /= 1000;
        suffixNum++;
      }
    
      newValue = newValue.toPrecision(3);
      newValue += suffixes[suffixNum];

      return newValue;
    }
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
      
      // add the item to search history
      if (this.saveHistory)
        this.searchHistoryProvider.addItemToHistory(userInput);
    }
  }
}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SearchResultsPage } from '../search-results/search-results';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchHistory: Set<string> = new Set;

  constructor(public navCtrl: NavController, public storage: Storage) {
  }

  ionViewDidLoad() {
    this.storage.forEach((val, key, i) => {
      this.searchHistory.add(val);
    });
  }

  viewSearchResults(userInput : string) {
    this.navCtrl.push(SearchResultsPage, {
      userInput : userInput.trim()
    });

    this.storage.set("History Item "+ this.searchHistory.size, userInput);
    this.searchHistory.add(userInput);
  }

  deleteHistoryItem(item: string) {
    this.searchHistory.delete(item);

    this.storage.forEach((val, key, i) => {
      if (val == item) {
        this.storage.remove(key);
      }
    });
  }
}
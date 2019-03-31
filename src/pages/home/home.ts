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
    this.loadSearchHistory();
  }

  viewSearchResults(userInput : string) {
    if (userInput != "") {
      this.navCtrl.push(SearchResultsPage, {
        userInput : userInput.trim()
      });
  
      this.addItemToHistory(userInput);
    }
  }

  // add each value of "Search History" to the searchHistory Set
  loadSearchHistory() {
    this.storage.get("Search History").then((history) => {
      if (history != null) 
        for (let i in history)
          this.searchHistory.add(history[i]);
    });
  }

  addItemToHistory(item: string) {
    this.searchHistory.add(item);
    this.storage.set("Search History", Array.from(this.searchHistory)); // convert the Set to an Array and store its elements
  }

  deleteHistoryItem(item: string) {
    this.searchHistory.delete(item); // delete the item from the searchHistory Set

    // search for item, and remove it from the history array
    this.storage.get("Search History").then((history) => {
      if (history != null)
        for (let i in history)
          if (item == history[i]) {
            history.splice(i, 1); // remove item from history[]
            this.storage.set("Search History", history);
          }
    });
  }
}
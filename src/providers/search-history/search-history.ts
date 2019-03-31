import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchHistoryProvider {

  searchHistory: Set<string> = new Set;

  constructor(public storage: Storage) {
    console.log('Hello SearchHistoryProvider Provider');
  }

    // add each value of "Search History" to the searchHistory Set
    loadSearchHistory() : Set<string> {
      this.storage.get("Search History").then((history) => {
        if (history != null) 
          for (let i in history)
            this.searchHistory.add(history[i]);
      });

      return this.searchHistory;
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

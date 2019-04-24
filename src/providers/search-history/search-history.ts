import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

const HISTORY_KEY: string = "Search History";

@Injectable()
export class SearchHistoryProvider {

  private searchHistory: Set<string> = new Set;

  constructor(private storage: Storage) {
  }

  // add each value of HISTORY_KEY to the searchHistory Set and return it
  loadSearchHistory(): Set<string> {
    this.storage.get(HISTORY_KEY).then((history) => {
      if (history != null) 
        for (let i in history)
          this.searchHistory.add(history[i]);
    });

    return this.searchHistory;
  }

  addItemToHistory(item: string) {
    this.searchHistory.add(item);
    this.storage.set(HISTORY_KEY, Array.from(this.searchHistory)); // convert the Set to an Array and store its elements
  }

  deleteHistoryItem(item: string) {
    this.searchHistory.delete(item); // delete the item from the searchHistory Set

    // search for item, and remove it from the history array
    this.storage.get(HISTORY_KEY).then((history) => {
      if (history != null)
        for (let i in history)
          if (item == history[i]) {
            history.splice(i, 1); // remove item from history[]
            this.storage.set(HISTORY_KEY, history);
          }
    });
  }

  // removes all items from search history by clearing both the Set and storage
  clearHistory() {
    this.searchHistory.clear();
    this.storage.remove(HISTORY_KEY);
  }
}

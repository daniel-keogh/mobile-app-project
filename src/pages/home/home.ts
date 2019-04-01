import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SearchResultsPage } from '../search-results/search-results';
import { SearchHistoryProvider } from '../../providers/search-history/search-history';
import { ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchHistory: Set<string> = new Set;
  showHistory: boolean;

  constructor(public navCtrl: NavController, public storage: Storage, private searchHistoryProvider: SearchHistoryProvider, private actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.searchHistory = this.searchHistoryProvider.loadSearchHistory();
    
    this.storage.get("Show Search History").then((option) => {
      if (option == false)
        this.showHistory = false;
      else
        this.showHistory = true;
    });
  }

  viewSearchResults(userInput : string) {
    if (userInput != "") {
      this.navCtrl.push(SearchResultsPage, {
        userInput : userInput.trim()
      });
  
      this.searchHistoryProvider.addItemToHistory(userInput);
    }
  }

  deleteHistoryItem(item: string) {
    this.searchHistoryProvider.deleteHistoryItem(item);
  }
  
  presentActionSheet(item: string) {
    const actionSheet = this.actionSheetCtrl.create({
      title: item,
      buttons: [
        {
          text: "Search for \""+ item + "\"",
          icon: "search",
          handler: () => {
            this.viewSearchResults(item);
          }
        },
        {
          text: "Delete \""+ item + "\"",
          role: "destructive",
          icon: "trash",
          handler: () => {
            this.deleteHistoryItem(item);
          }
        },{
          text: "Clear History",
          role: "destructive",
          icon: "nuclear",
          handler: () => {
            this.searchHistoryProvider.clearHistory();
          }
        },{
          text: "Cancel",
          role: "cancel",
          icon: "close"
        }
      ]
    });
    actionSheet.present();
  }

  updateShowHistory() {
    this.storage.set("Show Search History", this.showHistory);
  }
}
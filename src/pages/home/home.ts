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

  constructor(public navCtrl: NavController, public storage: Storage, private searchHistoryProvider: SearchHistoryProvider, private actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.searchHistory = this.searchHistoryProvider.loadSearchHistory();
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
          text: "Delete Item",
          role: "destructive",
          handler: () => {
            this.deleteHistoryItem(item);
          }
        },{
          text: "Clear History",
          role: "destructive",
          handler: () => {
            this.searchHistoryProvider.clearHistory();
          }
        },{
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';
import { Observable } from 'rxjs';

import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Injectable()
export class OpenExternallyProvider {

  constructor(public http: HttpClient, private device: Device, private appAvailability: AppAvailability, private iab: InAppBrowser, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {
  }

  // Based on this answer from eivanov: https://forum.ionicframework.com/t/ionic-opening-external-app/77932/3
  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, path: string) {
    let app: string;
    if (this.device.platform === 'iOS') {
      app = iosSchemaName;
    } else if (this.device.platform === 'Android') {
      app = androidPackageName;
    } else {
      this.iab.create(httpUrl + path, '_system');
      return;
    }
  
    this.appAvailability.check(app).then(() => {
        this.iab.create(appUrl + path, '_system');
      }, () => {
        // If the app isn't installed, the default web browser is opened instead.
        const confirm = this.alertCtrl.create({
          title: "Open in a browser?",
          message: "It appears that app isn't installed on your device. Do you want to open the link in a browser instead?",
          buttons: [
            {
              text: "Go Back",
              role: 'cancel',
              handler: () => {
                return;
              }
            },{
              text: "OK",
              handler: () => {
                this.iab.create(httpUrl + path, '_system'); 
              }
            }
          ]
        });
        confirm.present();
      }
    );
  }

  presentOpenExternallyActionSheet(artist: string, track: string) {
    const actionSheet = this.actionSheetCtrl.create({
      title: track +" - "+ artist,
      buttons: [
        {
          text: "Search Deezer",
          handler: () => {
            this.openInDeezer(artist);
          }
        },{
          text: "Search YouTube",
          handler: () => {
            this.openInYouTube(track + " - " + artist);
          }
        },{
          text: "Search YouTube Music",
          handler: () => {
            this.openInYouTubeMusic(track + " - " + artist);
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
  
  // The below functions all work when tested on android. Since i don't have an iOS device, i can't verify if they work there too.
  openInYouTube(searchQuery: string) {
    this.launchExternalApp('youtube://', 'com.google.android.youtube', 'vnd.youtube:///results?search_query=', 'https://www.youtube.com/results?search_query=', searchQuery);
  }

  openInYouTubeMusic(searchQuery: string) {
    this.launchExternalApp('youtube.music://', 'com.google.android.apps.youtube.music', 'vnd.youtube.music:///search?q=', 'https://music.youtube.com/search?q=', searchQuery);
  }

  openInDeezer(searchQuery: string) {
    let id: any;

    this.searchForDeezerArtist(searchQuery).subscribe((results) => {
      id = results.data[0].id;
    }, () => {
    }, () => {
      this.launchExternalApp('deezer://', 'deezer.android.app', 'deezer://www.deezer.com/artist/', 'https://www.deezer.com/artist/', id);
    });
  }

  searchForDeezerArtist(artistName: string): Observable<any> {
    return this.http.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist?q="+ artistName);
  }
}

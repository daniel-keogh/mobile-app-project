import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ActionSheetController, AlertController } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';

@Injectable()
export class OpenExternallyProvider {

  constructor(private http: HttpClient, private device: Device, private appAvailability: AppAvailability, private iab: InAppBrowser, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController) {
  }

  // Based on this answer from eivanov: https://forum.ionicframework.com/t/ionic-opening-external-app/77932/3
  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, path: string) {
    let app: string;

    // Find what platform the device is on
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
        // If the app isn't installed, prompt to open the default web browser instead.
        const confirm = this.alertCtrl.create({
          title: "Open in a browser?",
          message: "It appears "+ this.getAppName(app) +" isn't installed on your device. Do you want to open the link in a browser instead?",
          buttons: [
            {
              text: "No",
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
            let searchQuery: string = 'artist:"'+ encodeURIComponent(artist) +'"track:"'+ encodeURIComponent(track) +'"';
            this.openInDeezer(searchQuery);
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
  
  private getAppName(app: string): string {
    switch(app) {
      case "deezer.android.app":
      case "deezer://":
        return "Deezer";
      case "com.google.android.youtube":
      case "youtube://":
        return "YouTube";
      case "com.google.android.apps.youtube.music":
      case "youtube.music://":
        return "YouTube Music";
      default:
        return null;
    }
  }
  
  private openInYouTube(searchQuery: string) {
    this.launchExternalApp('youtube://', 'com.google.android.youtube', 'vnd.youtube:///results?search_query=', 'https://www.youtube.com/results?search_query=', encodeURIComponent(searchQuery));
  }

  private openInYouTubeMusic(searchQuery: string) {
    this.launchExternalApp('youtube.music://', 'com.google.android.apps.youtube.music', 'vnd.youtube.music:///search?q=', 'https://music.youtube.com/search?q=', encodeURIComponent(searchQuery));
  }

  private openInDeezer(searchQuery: string) {
    let id: any;

    this.searchForDeezerTrack(searchQuery).subscribe((results) => {
      id = results.data[0].id; // get the id of the track
    }, () => {
    }, () => {
      this.launchExternalApp('deezer://', 'deezer.android.app', 'deezer://www.deezer.com/track/', 'https://www.deezer.com/track/', id);
    });
  }

  private searchForDeezerTrack(searchQuery: string): Observable<any> {
    return this.http.get('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q='+ searchQuery);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';
import { Observable } from 'rxjs';

@Injectable()
export class OpenExternallyProvider {

  constructor(public http: HttpClient, private device: Device, private appAvailability: AppAvailability, private iab: InAppBrowser) {
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
  
    this.appAvailability.check(app).then(
      () => { // success callback
        this.iab.create(appUrl + path, '_system');
      },
      () => { // error callback
        this.iab.create(httpUrl + path, '_system'); // if the app isn't installed, the default web browser is opened instead.
      }
    );
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { AppAvailability } from '@ionic-native/app-availability';

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
        this.iab.create(httpUrl + path, '_system');
      }
    );
  }

  openInYouTube(searchQuery: string) {
    this.launchExternalApp('youtube://', 'com.google.android.youtube', 'vnd.youtube:///results?search_query=', 'https://www.youtube.com/results?search_query=', searchQuery);
  }
}

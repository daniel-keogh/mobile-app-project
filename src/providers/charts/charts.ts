import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Globalization } from '@ionic-native/globalization';

const WORLDWIDE_PLAYLIST_ID: number = 3155776842;

@Injectable()
export class ChartsProvider {

  private usersLocale: any;

  constructor(private http: HttpClient, private globalization: Globalization) {
    this.getUsersLocale();
  }

  getCharts(playlistID: number): Observable<any> {
    // This URL prevents the blocking of Cross-Origin Requests
    return this.http.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/"+ playlistID +"/tracks&limit=100");
  }

  getCountries(): Observable<any> {
    return this.http.get("../../assets/country-charts.json"); // read from local JSON file.
  }

  // Search the countries array for the users locale and set the playlist id to the associated country if a match is found.
  getDefaultPlaylistID(countries: any[]): number {
    for (let i = 0; i < countries.length; i++) {
      for (let j = 0; j < countries[i].locale.length; j++) {
        if (countries[i].locale[j] == this.usersLocale) {
          return countries[i].playlist_id; // locale found: retreive the playlist ID of the matching country and use that as the default. 
        }
      }
    }
    return WORLDWIDE_PLAYLIST_ID; // The users locale was either not found, or there is no matching country.
  }

  // Find the users locale using the globalisation plugin.
  // The docs say this should work in a browser but it doesn't, but I can confirm it definitely does work when tested on an android device (only when installed as a .apk though).
  private getUsersLocale(): any {
    this.globalization.getLocaleName()
      .then(res => this.setUsersLocale(res.value))
      .catch(e => this.setUsersLocale(null));
  }

  private setUsersLocale(locale: any) {
    this.usersLocale = locale;
  }
}

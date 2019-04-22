import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Globalization } from '@ionic-native/globalization';

const WORLDWIDE_PLAYLIST_ID: number = 3155776842;

@Injectable()
export class ChartsProvider {

  usersLocale: any;
  localePlaylistID: number;

  constructor(public http: HttpClient, private globalization: Globalization) {
    this.getUsersLocale();
  }

  getCharts(playlistID: number): Observable<any> {
    // This URL prevents the blocking of Cross-Origin Requests
    return this.http.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/"+ playlistID +"/tracks&limit=50");
  }

  getCountries(): Observable<any> {
    return this.http.get("../../assets/country-charts.json"); // read from local JSON file.
  }

  // Return the playlist ID. If the users locale was not found, or there is no matching country then use WORLDWIDE_PLAYLIST_ID by default. 
  getDefaultPlaylistID(): number { 
    if (this.localePlaylistID != null)
        return this.localePlaylistID;
    else
        return WORLDWIDE_PLAYLIST_ID;
  }

  // Search the countries array for the users locale and set the playlist id to the associated country if a match is found.
  searchForLocale(countries: any[]) {
    for (let i = 0; i < countries.length; i++) {
      for (let j = 0; j < countries[i].locale.length; j++) {
        if (countries[i].locale[j] == this.usersLocale) {
          this.localePlaylistID = countries[i].playlist_id; // locale found, retreive the playlist ID of the matching country. 
          return;
        }
      }
    }
    this.localePlaylistID = null;
  }

  // Find the users locale using the globalisation plugin.
  private getUsersLocale(): any {
    this.globalization.getLocaleName()
      .then(res => this.setUsersLocale(res.value))
      .catch(e => this.setUsersLocale(null));
  }

  private setUsersLocale(locale: any) {
    this.usersLocale = locale;
  }
}

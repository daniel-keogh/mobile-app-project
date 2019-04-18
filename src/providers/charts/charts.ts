import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const WORLDWIDE_PLAYLIST: number = 3155776842;

@Injectable()
export class ChartsProvider {

  constructor(public http: HttpClient) {
  }

  getCharts(playlistID: number): Observable<any> {
    return this.http.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/"+ playlistID +"/tracks&limit=50");
  }

  getCountries(): Observable<any> {
    return this.http.get("../../assets/country-charts.json");
  }

  getDefaultPlaylistID(): number {
    return WORLDWIDE_PLAYLIST;
  }
}

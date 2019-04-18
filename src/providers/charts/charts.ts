import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ChartsProvider {

  constructor(public http: HttpClient) {
  }

  getCharts(playlistID: number): Observable<any> {
    return this.http.get("https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/"+ playlistID +"/tracks&limit=50");
  }
}

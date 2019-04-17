import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ChartsProvider {

  constructor(public http: HttpClient) {
  }

  getTopTracks() : Observable<any> {
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=05474453d4140db7fad8d7eee652eee3&limit=100&format=json");
  }

  getTopArtists(): Observable<any> {
    return this.http.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=05474453d4140db7fad8d7eee652eee3&limit=100&format=json");
  }
}

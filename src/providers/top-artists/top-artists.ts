import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TopArtistsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TopArtistsProvider Provider');
  }

  getTopArtists() : Observable<any> {
    return this.http.get("https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=05474453d4140db7fad8d7eee652eee3&format=json");
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SimilarArtistsProvider {

  constructor(public http: HttpClient) {
  }

  getSearchResults(searchQuery : string) : Observable<any> {
    const limit: number = 25;

    // make the search query URL safe.
    searchQuery = searchQuery.replace(/  +/g, ' ');
    searchQuery = searchQuery.split(' ').join('+');

    return this.http.get('https://ws.audioscrobbler.com/2.0/?method=artist.search&limit='+ limit +'&api_key=05474453d4140db7fad8d7eee652eee3&format=json&artist=' + searchQuery);
  }

  getArtistInfo(artist: string): Observable<any> {
    return this.http.get("https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+ artist +"&api_key=05474453d4140db7fad8d7eee652eee3&format=json");
  }

  getSimilar(artist: string): Observable<any> {
    return this.http.get("https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+ artist +"&api_key=05474453d4140db7fad8d7eee652eee3&limit=20&format=json");
  }
}

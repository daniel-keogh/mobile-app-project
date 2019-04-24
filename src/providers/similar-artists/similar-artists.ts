import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SanitiseProvider } from '../sanitise/sanitise';

@Injectable()
export class SimilarArtistsProvider {

  constructor(private http: HttpClient, private sanitiseProvider: SanitiseProvider) {
  }

  getSearchResults(searchQuery : string) : Observable<any> {
    return this.http.get('https://ws.audioscrobbler.com/2.0/?method=artist.search&limit=25&api_key=05474453d4140db7fad8d7eee652eee3&format=json&artist=' + this.sanitiseProvider.makeURLSafe(searchQuery));
  }

  getArtistInfo(artist: string): Observable<any> {
    return this.http.get("https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+ artist +"&api_key=05474453d4140db7fad8d7eee652eee3&format=json");
  }

  getTopTracks(artist: string): Observable<any> { 
    return this.http.get("https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist="+ artist +"&api_key=05474453d4140db7fad8d7eee652eee3&limit=15&format=json")
  }

  getTopAlbums(artist: string): Observable<any> { 
    return this.http.get("https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist="+ artist +"&api_key=05474453d4140db7fad8d7eee652eee3&limit=6&format=json")
  }

  getAlbumInfo(album: string, artist: string): Observable<any> {
    return this.http.get("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=05474453d4140db7fad8d7eee652eee3&artist="+ artist +"&album="+ album +"&format=json");
  }

  getSimilar(artist: string): Observable<any> {
    return this.http.get("https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist="+ artist +"&api_key=05474453d4140db7fad8d7eee652eee3&limit=25&format=json");
  }
}

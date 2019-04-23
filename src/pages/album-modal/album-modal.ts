import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { OpenExternallyProvider } from '../../providers/open-externally/open-externally';
import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists';
import { AbbreviateNumbersProvider } from '../../providers/abbreviate-numbers/abbreviate-numbers';

@IonicPage()
@Component({
  selector: 'page-album-modal',
  templateUrl: 'album-modal.html',
})
export class AlbumModalPage {

  album: any = []
  albumName: string;
  artistName: string;
  albumCover: string;
  numListeners: any;
  playcount: any;
  tracklist: any = [];

  constructor(public navParams: NavParams, public viewCtrl: ViewController, private similarArtistsProvider: SimilarArtistsProvider, private openExternallyProvider: OpenExternallyProvider, private abbreviateNumbersProvider: AbbreviateNumbersProvider) {
    this.albumName = navParams.get("albumName");
    this.artistName = navParams.get("artistName");
  }

  ionViewDidLoad() {
    this.loadAlbumInfo();
  }

  loadAlbumInfo() {
    this.album = this.similarArtistsProvider.getAlbumInfo(this.albumName, this.artistName).subscribe((data) => {
      this.album = data.album;
      this.tracklist = data.album.tracks.track;
      this.albumCover = data.album.image[4]['#text'];
      this.numListeners = this.abbreviateNumbersProvider.abbreviateNumber(data.album.listeners);
      this.playcount = this.abbreviateNumbersProvider.abbreviateNumber(data.album.playcount);
    });
  }

  presentActionSheet(artist: string, track: string) {
    this.openExternallyProvider.presentOpenExternallyActionSheet(artist, track);
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }
}

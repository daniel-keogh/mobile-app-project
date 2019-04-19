import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists';

@IonicPage()
@Component({
  selector: 'page-album-modal',
  templateUrl: 'album-modal.html',
})
export class AlbumModalPage {

  album: any = []
  albumName: string;
  artistName: string;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, private similarArtistsProvider: SimilarArtistsProvider) {
    this.albumName = navParams.get("albumName");
    this.artistName = navParams.get("artistName");
  }

  ionViewDidLoad() {
    this.album = this.similarArtistsProvider.getAlbumInfo(this.albumName, this.artistName).subscribe((data) => {
      this.album = data.album;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SimilarArtistsProvider } from '../../providers/similar-artists/similar-artists';
import { OpenExternallyProvider } from '../../providers/open-externally/open-externally';
import { SanitiseProvider } from '../../providers/sanitise/sanitise';
import { ModalController } from 'ionic-angular';
import { AlbumModalPage } from '../album-modal/album-modal';

@IonicPage()
@Component({
  selector: 'page-artist-info',
  templateUrl: 'artist-info.html',
})
export class ArtistInfoPage {

  segment: any;
  artist: string;
  artistImg: any;
  artistInfo: any = [];
  bio: any;
  bioSummary: any = [];
  bioContent: any = [];
  showTgl: string;
  similarArtists: any = [];
  topAlbums: any = [];
  topTracks: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private similarArtistsProvider: SimilarArtistsProvider, public modalCtrl: ModalController, private openExternallyProvider: OpenExternallyProvider, private sanitiseProvider: SanitiseProvider) {
    this.artist = navParams.get('artist');
  }

  ionViewDidLoad() {
    this.segment = "thisArtist";
    this.showTgl = "Show More";

    this.loadArtistInfo();
    this.loadTopAlbums();
    this.loadTopTracks();
    this.loadSimilarArtists();
  }

  loadArtistInfo() {
    this.similarArtistsProvider.getArtistInfo(this.artist).subscribe((data) => {
      this.artistInfo = data.artist;
      this.artistImg = data.artist.image[4]['#text'];

      this.bioContent = this.sanitiseProvider.cleanText(data.artist.bio.content);
      this.bioSummary = this.sanitiseProvider.cleanText(data.artist.bio.summary);
      this.bio = this.bioSummary;
    });
  }

  loadSimilarArtists() {
    this.similarArtistsProvider.getSimilar(this.artist).subscribe((data) => {
      this.similarArtists = data.similarartists.artist;
    });
  }

  loadTopAlbums() {
    this.similarArtistsProvider.getTopAlbums(this.artist).subscribe((data) => {
      this.topAlbums = data.topalbums.album;
    });
  }

  loadTopTracks() {
    this.similarArtistsProvider.getTopTracks(this.artist).subscribe((data) => {
      this.topTracks = data.toptracks.track;
    });
  }

  showMoreLess() {
    if (this.bio == this.bioSummary) {
      this.bio = this.bioContent;
      this.showTgl = "Show Less";
    }
    else {
      this.bio = this.bioSummary;
      this.showTgl = "Show More";
    }
  }

  viewAlbum(album: string) {
    const modal = this.modalCtrl.create(AlbumModalPage, {
      artistName : this.artist,
      albumName : album
    });
    modal.present();
  }

  viewArtist(artistName: string) {
    this.navCtrl.push(ArtistInfoPage, {
      artist : artistName,
    });
  }

  presentActionSheet(artist: string, track: string) {
    this.openExternallyProvider.presentOpenExternallyActionSheet(artist, track);
  }
}

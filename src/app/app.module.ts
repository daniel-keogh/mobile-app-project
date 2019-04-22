import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChartsPage } from '../pages/charts/charts';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchResultsPage } from '../pages/search-results/search-results';
import { ArtistInfoPage } from '../pages/artist-info/artist-info';
import {AlbumModalPage } from '../pages/album-modal/album-modal';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { SimilarArtistsProvider } from '../providers/similar-artists/similar-artists';
import { SearchHistoryProvider } from '../providers/search-history/search-history';
import { ChartsProvider } from '../providers/charts/charts';

import { Globalization } from '@ionic-native/globalization';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchResultsPage,
    ArtistInfoPage,
    ChartsPage,
    TabsPage,
    AlbumModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true}),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchResultsPage,
    ArtistInfoPage,
    ChartsPage,
    TabsPage,
    AlbumModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SimilarArtistsProvider,
    SearchHistoryProvider,
    ChartsProvider,
    Globalization
  ]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchResultsPage } from '../pages/search-results/search-results';
import { ArtistInfoPage } from '../pages/artist-info/artist-info';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { SimilarArtistsProvider } from '../providers/similar-artists/similar-artists';
import { SearchHistoryProvider } from '../providers/search-history/search-history';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchResultsPage,
    ArtistInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchResultsPage,
    ArtistInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SimilarArtistsProvider,
    SearchHistoryProvider
  ]
})
export class AppModule {}

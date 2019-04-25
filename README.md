# G00335478

Y2S2 Mobile Applications Development Project

# Description
A simple, hybrid mobile application that helps you find music artists you might like by using data from [Last.fm](https://www.last.fm/about) and [Deezer](https://www.deezer.com/company). 

Built with [Ionic](https://ionicframework.com/) version 3.

# Overview
The app allows you to search for a music artist of interest, and then view information about that artist as well as similar artists. Most of the information displayed is retrieved using [Last.fm's API](https://www.last.fm/api), including:

- The search results.
- Suggestions of similar artists.
- Artist bio's and images.
- Album track lists and images.

## Charts
Chart information is retrieved using [Deezer's API](https://developers.deezer.com/) and is based on the [Deezer Charts](https://www.deezer.com/profile/637006841/playlists) section of their website. 

The top 100 songs from the 64 countries listed are displayed, depending on the user's locale. The app should automatically detect the user's locale and display the appropriate charts.

# Ionic Native Plugins
Several Ionic Native plugins are used to give the app more functionality:

- [App Availability](https://github.com/ohh2ahh/AppAvailability)
- [Device](https://github.com/apache/cordova-plugin-device)
- [In App Browser](https://github.com/apache/cordova-plugin-inappbrowser)
- [Globalisation](https://github.com/apache/cordova-plugin-globalization)

# Screenshots
<div display="inline">
  <img src="https://user-images.githubusercontent.com/37158241/56760468-24659000-6793-11e9-98e3-442c9d137e6f.png" height="550" width="308" alt="iOS"/>
  <img src="https://user-images.githubusercontent.com/37158241/56760474-2a5b7100-6793-11e9-890a-0bec741a91f0.png" height="550" width="308" hspace="20" alt="Android"/>
</div>

# Credits
## Icons
Some of the icons used in the app were made by [SmashIcons](https://smashicons.com/) and obtained via www.flaticon.com.

# License
GPL v.3

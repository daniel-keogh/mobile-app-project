import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ChartsPage } from '../charts/charts';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homeTabRoot = HomePage;
  chartsTabRoot = ChartsPage;

  constructor() {
    
  }

}

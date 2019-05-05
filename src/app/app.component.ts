import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (!this.platform.is('cordova')) document.getElementsByTagName('body')[0].setAttribute('style', 'width: 420px;margin-left: auto!important;margin-right: auto!important;position: relative;');

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tasksService: TasksService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (!this.platform.is('cordova')) document.getElementsByTagName('body')[0].setAttribute('style', 'width: 450px;margin-left: auto!important;margin-right: auto!important;position: relative;    background-color: #303030;');
      this.tasksService.loadStorage().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();


      });

    });
  }
}

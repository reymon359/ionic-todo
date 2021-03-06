import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public tasksService: TasksService, private router: Router,
    private alertController: AlertController,  private platform: Platform) {

  }

  async addList() {
    const alert = await this.alertController.create({
      header: 'New list',
      inputs: [{
        name: 'title',
        type: 'text',
        placeholder: 'List name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel');
        }
      },
      {
        text: 'Add',
        handler: (data) => {
          if (data.title.length === 0) {
            return;
          }
          const idList = this.tasksService.createList(data.title);

          // Now we redirect to the list
          this.router.navigateByUrl(`/tabs/tab1/add/${idList}`);

        }
      }]
    });

    await alert.present();
  }

  async openInfo() {
    const alert = await this.alertController.create({
      header: 'Information',
      subHeader: 'This is a simple to do app done with ionic ',
      message: 'You can slide the lists and items to right and left to edit and remove them',

      buttons: [{
        text: 'Ok'
      },
      {
        text: 'Play Store',
        handler: () => {
          window.location.href = `https://play.google.com/store/apps/details?id=com.ramonmorcillo.todoapp`;
        }
      }]
    });

    await alert.present();
  }

}

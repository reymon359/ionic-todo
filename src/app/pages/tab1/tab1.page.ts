import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public tasksService: TasksService, private router: Router,
    private alertController: AlertController) {

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
          this.router.navigateByUrl(`/tabs/tab1/add/${ idList }`);

        }
      }]
    });

    await alert.present();
  }
}

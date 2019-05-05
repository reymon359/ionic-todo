import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild(IonList ) list: IonList;
  @Input() done = true;

  constructor(public tasksService: TasksService, private router: Router,
    private alertController: AlertController) { }

  ngOnInit() { }

  selectedList(list: List) {
    if (this.done) {

      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);

    }

  }

  deleteList(list: List) {

    this.tasksService.deleteList(list);
  }

  async  editList(list: List) {
    const alert = await this.alertController.create({
      header: 'Edit list',
      inputs: [{
        name: 'title',
        type: 'text',
        value: list.title,
        placeholder: 'List name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel');
          this.list.closeSlidingItems();

        }
      },
      {
        text: 'Update',
        handler: (data) => {
          if (data.title.length === 0) {
            return;
          }
          list.title = data.title;
          this.tasksService.saveStorage();
          this.list.closeSlidingItems();
        }
      }]
    });

    await alert.present();
  }
}

import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  lists: List[] = [];

  constructor(private platform: Platform, private storage: Storage) {

    this.loadStorage();

  }

  createList(title: string) {
    const newList = new List(title);
    this.lists.push(newList);
    this.saveStorage();

    return newList.id;
  }

  deleteList(list: List) {
    this.lists = this.lists.filter(listData => listData.id !== list.id);
    this.saveStorage();
  }

  getList(id: string | number) {
    id = Number(id);
    return this.lists.find(listData => listData.id === id);
  }


  saveStorage() {
    if (this.platform.is('cordova')) { // mobile
      this.storage.ready().then(() => {
        this.storage.set('data', this.lists);
      });
    } else {  // Desktop
      localStorage.setItem('data', JSON.stringify(this.lists));
    }


  }

  loadStorage() {
    if (this.platform.is('cordova')) { // mobile
      this.storage.ready()
        .then(() => { // When the storage is ready
          this.storage.get('data') // get the settings
            .then(data => {

              if (data) { this.lists = data; }

            });
        });
    } else {  // Desktop
      if (localStorage.getItem('data')) {
        this.lists = JSON.parse(localStorage.getItem('data'));
      } else { this.lists = []; }
    }


  }
}

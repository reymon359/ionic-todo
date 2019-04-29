import { Injectable } from '@angular/core';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  lists: List[] = [];

  constructor() {

    const list1 = new List('Get infinite stones');
    const list2 = new List('heroes to disappear');

    this.lists.push(list1, list2);
  }

}

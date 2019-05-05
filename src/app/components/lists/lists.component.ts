import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @Input() done = true;

  constructor(public tasksService: TasksService, private router: Router) { }

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
}

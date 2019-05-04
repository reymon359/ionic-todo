import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  taskName = '';
  constructor(private tasksService: TasksService, private router: ActivatedRoute) {

    const idList = this.router.snapshot.paramMap.get('idList');

    this.list = this.tasksService.getList(idList);
  }

  ngOnInit() {
  }

  addItem() {
    if (this.taskName.length === 0) { return; }

    const newTask = new Task(this.taskName);
    this.list.tasks.push(newTask);

    this.taskName = '';
    this.tasksService.saveStorage();
  }

  checkChange(item: Task) {

    const pending = this.list.tasks
      .filter(itemData => !itemData.completed)
      .length;

    if (pending === 0) {
      this.list.dateCompleted = new Date();
      this.list.completed = true;
    } else {
      this.list.dateCompleted = null;
      this.list.completed = false;
    }

    this.tasksService.saveStorage();
  }

  delete(i: number) {
    this.list.tasks.splice(i, 1);
    this.tasksService.saveStorage();
  }
}

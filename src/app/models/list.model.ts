import { Task } from './task.model';


export class List {

    id: number;
    title: string;
    dateCreated: Date;
    dateCompleted: Date;
    completed: boolean;
    tasks: Task[];

    constructor(title: string) {

        this.title = title;
        this.dateCreated = new Date();
        this.completed = false;
        this.tasks = [];
        this.id = new Date().getTime();

    }
}

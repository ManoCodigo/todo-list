import { ThisReceiver } from '@angular/compiler';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { ServiceToDoService } from 'src/app/modules/service-to-do.service';

//Interface
import { TodoList } from '../../model/todo-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, DoCheck {

  @Input()

  //NOVO
  public viewList: Array<TodoList> = []

  constructor(
    private serviceToDoService: ServiceToDoService,
  ) { }

  ngOnInit(): void {
    //NOVO
    this.serviceToDoService.toDoList().subscribe({
      next: (res) => this.viewList = res,
      error: (err) => console.log('ERR GET>'+ err),
    })

    this.serviceToDoService.emmit.subscribe({
      next: (res: any) => {
        return this.viewList.push(res)
      },
      error: (err: any) => err
    })
  }

  ngDoCheck() {
    //NOVO
    if (this.viewList){
      this.viewList.sort((firts: any, last: any) => Number(firts.checked) - Number(last.checked))
      localStorage.setItem('list', JSON.stringify(this.viewList))
    }
  }

  //NOVO...
  public toDoEditList(id: number, value: string, check: boolean) {
    this.serviceToDoService.toDoEdit(id, value, check).subscribe({
      next: (res) => res,
      error: (err) => console.log('ERROR EDITLIST: ' + err)
    })
  }

  //NOVO POST
  public toDoAddList(value: string) {
    this.serviceToDoService.toDoAdd(value).subscribe({
      next: (res: any) => this.serviceToDoService.reloadList(res),
      error: (err: any) => console.log('ERROR ADDLIST: ' + err)
    })
  }

  public toDoDeleteList(id: number) {
    this.serviceToDoService.toDoDelete(id).subscribe({
      next: (res) => {
        this.viewList = this.viewList.filter(
          item => {
            return id !== item.id
          }
        )
      }
    })
  }

  //NOVO
  public validaInput(id: number, value: string, check: boolean) {
    if (!value.length){
      this.toDoDeleteList(id)
    } else {
      this.toDoEditList(id, value, check)
    }
  }

}

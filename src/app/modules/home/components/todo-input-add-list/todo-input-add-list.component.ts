import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { takeLast } from 'rxjs';
import { ServiceToDoService } from 'src/app/modules/service-to-do.service';


@Component({
  selector: 'app-todo-input-add-list',
  templateUrl: './todo-input-add-list.component.html',
  styleUrls: ['./todo-input-add-list.component.scss']
})
export class TodoInputAddListComponent implements OnInit {

  @Output() public emitItem = new EventEmitter()

  public addItem: string = ''

  constructor(
    private  serviceToDoService: ServiceToDoService
  ) { }

  ngOnInit(): void {
  }

  public submitItem() {

    this.addItem = this.addItem.trim()
    if (this.addItem) {
      this.emitItem.emit(this.addItem)
      // this.serviceToDoService.reloadList()
      this.addItem = ''
    }
  }

}

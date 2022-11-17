import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoList } from './home/model/todo-list';



@Injectable({
  providedIn: 'root'
})
export class ServiceToDoService {

  public emmit = new EventEmitter()

  private url_db = 'http://localhost:3000/to-do-db'

  constructor(
    private http: HttpClient,
  ) { }

  //GET
  public toDoList(): Observable<Array<TodoList>> {
    return this.http.get<Array<TodoList>>(this.url_db).pipe(
      res => res,
      err => err
    )
  }

  //POST
  public toDoAdd(value: string): Observable<Array<TodoList>> {
    return this.http.post<Array<TodoList>>(this.url_db, {task: value}).pipe(
      res => res,
      err => err
    )
  }

  //PUT
  public toDoEdit(id: number, value: string, check: boolean): Observable<Array<TodoList>> {
    return this.http.put<Array<TodoList>>(`${this.url_db}/${id}`,{task: value, checked: check}).pipe(
      res => res,
      err => err
    )
  }

  //DELETE
  public toDoDelete(id: number): Observable<Array<TodoList>> {
    return this.http.delete<Array<TodoList>>(`${this.url_db}/${id}`)
  }

  public reloadList(value: TodoList) {
    return this.emmit.emit(value)
  }

}

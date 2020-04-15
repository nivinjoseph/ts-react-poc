import { Observable } from "rxjs";
import { Todo } from "../../models/todo";


export interface TodoService
{
    readonly todos: Observable<ReadonlyArray<Todo>>;
 
    createTodo(text: string): Promise<void>;
    deleteTodo(id: number): Promise<void>;
}
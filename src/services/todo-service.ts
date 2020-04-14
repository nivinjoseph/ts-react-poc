import { Todo } from "../models/todo";
import { given } from "@nivinjoseph/n-defensive";
import { Delay } from "@nivinjoseph/n-util";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { BehaviorSubject, Observable } from "rxjs";


export class TodoService
{
    private readonly _todosSubject: BehaviorSubject<Array<Todo>>

    private static _instance: TodoService;


    public get todos(): Observable<ReadonlyArray<Todo>> { return this._todosSubject; }

    public static get instance(): TodoService
    {
        if (this._instance == null)
            this._instance = new TodoService();

        return this._instance;
    }

    
    private constructor()
    {
        this._todosSubject = new BehaviorSubject<Array<Todo>>([]);
    }


    public async createTodo(text: string): Promise<void>
    {
        given(text, "text").ensureHasValue().ensureIsString();
        text = text.trim();

        await Delay.milliseconds(100); // simulating delay

        const id = this._todosSubject.value.length === 0
            ? 1 : this._todosSubject.value.orderByDesc(t => t.id)[0].id + 1;

        this._todosSubject.next([...this._todosSubject.value, { id, text }]);
    }

    public async deleteTodo(id: number): Promise<void>
    {
        given(id, "id").ensureHasValue().ensureIsNumber();

        await Delay.milliseconds(100); // simulating delay

        const todo = this._todosSubject.value.find(t => t.id === id);
        if (!todo)
            throw new ApplicationException(`Todo with id ${id} not found`);

        this._todosSubject.next(this._todosSubject.value.where(t => t !== todo));
    }
}
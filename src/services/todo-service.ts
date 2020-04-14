import { Todo } from "../models/todo";
import { given } from "@nivinjoseph/n-defensive";
import { Delay } from "@nivinjoseph/n-util";
import { ApplicationException } from "@nivinjoseph/n-exception";
import { Observable, Observation } from "../base/observation";


export class TodoService
{
    private readonly _todos: Observation<Array<Todo>>
    
    private static _instance: TodoService;
    
    
    public get todos(): Observable<ReadonlyArray<Todo>> { return this._todos; }
    
    public static get instance(): TodoService
    { 
        if (this._instance == null)
            this._instance = new TodoService();
        
        return this._instance;
    }
    
    
    private constructor()
    {
        this._todos = new Observation<Array<Todo>>([]);
    }
    
    
    public async createTodo(text: string): Promise<void>
    {
        given(text, "text").ensureHasValue().ensureIsString();
        text = text.trim();
        
        await Delay.seconds(1); // simulating delay
        
        const id = this._todos.value.length === 0
            ? 1 : this._todos.value.orderByDesc(t => t.id)[0].id + 1;
        
        this._todos.change([...this._todos.value, { id, text }]);
    }
    
    public async deleteTodo(id: number): Promise<void>
    {
        given(id, "id").ensureHasValue().ensureIsNumber();
        
        await Delay.seconds(1); // simulating delay
        
        const todo = this._todos.value.find(t => t.id === id);
        if (!todo)
            throw new ApplicationException(`Todo with id ${id} not found`);
        
        this._todos.change(this._todos.value.where(t => t !== todo));
    }
}
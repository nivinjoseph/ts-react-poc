import * as React from "react";
import { ComponentBase } from "../base/component-base";
import { TodoService } from "../services/todo/todo-service";
import { Todo } from "../models/todo";
import { Provider } from "../providers/provider";


type State = {
    items: ReadonlyArray<Todo>;
};


export class TodoList extends ComponentBase<any, State>
{
    private readonly _todoService: TodoService;
    
    
    public constructor(props: any)
    {
        super(props);

        this.state = {
            items: []
        };
        
        this._todoService = Provider.global.resolve("TodoService");

        this.initialize();
    }
    
    
    public async handleDelete(id: number): Promise<void>
    {
        await this._todoService.deleteTodo(id);
    }
    
    public render(): JSX.Element
    {
        return (
            <ul>
                {this.state.items.map(item => (
                    <li key={item.id}>
                        <span>{item.text}</span><span>-----</span>
                        <button onClick={() => this.handleDelete(item.id)}>
                            Delete
                        </button>
                    </li>))}
            </ul>
        );
    }
    
    private initialize(): void
    {
        this.executeAfterMount(() =>
        {
            const subs = [
                this._todoService.todos.subscribe((todos) => this.setState({ items: todos }))
            ];

            this.executeBeforeUnmount(() => subs.forEach(t => t.unsubscribe()));
        });
    }
}
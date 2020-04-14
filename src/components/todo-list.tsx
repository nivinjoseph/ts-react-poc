import * as React from "react";
import { ComponentBase } from "../base/component-base";
import { TodoService } from "../services/todo-service";
import { Todo } from "../models/todo";


type State = {
    items: ReadonlyArray<Todo>;
};


export class TodoList extends ComponentBase<any, State>
{
    public constructor(props: any)
    {
        super(props);

        this.state = {
            items: []
        };

        this.executeAfterMount(() =>
        {
            const subs = [
                TodoService.instance.todos.subscribe((todos) => this.setState({ items: todos }))
            ];
            
            this.executeBeforeUnmount(() => subs.forEach(t => t.unsubscribe()));
        });
    }
    
    
    public async handleDelete(id: number): Promise<void>
    {
        await TodoService.instance.deleteTodo(id);
    }
    
    public render(): JSX.Element
    {
        console.log("Render in " + (this as Object).getTypeName());
        
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
}
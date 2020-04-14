import * as React from "react";
import { ComponentBase } from "../base/component-base";
import { TodoService } from "../services/todo-service";
import { Todo } from "../models/todo";


type State = {
    todos: ReadonlyArray<Todo>;
    todoText: string;
}

export class TodoInput extends ComponentBase<any, State>
{
    public constructor(props: any)
    {
        super(props);

        this.state = {
            todos: [],
            todoText: ""
        };
        
        this.executeAfterMount(() =>
        {
            const subscription = TodoService.instance.todos.subscribe((todos) => this.setState({ todos }));
            this.executeBeforeUnmount(() => subscription.unsubscribe());
        });
    }
    
    
    public handleChange(e: React.ChangeEvent<HTMLInputElement>): void
    {
        this.setState({ todoText: e.target.value });
    }

    public async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void>
    {
        e.preventDefault();
        
        if (this.state.todoText.length === 0)
            return;

        await TodoService.instance.createTodo(this.state.todoText);
        
        this.setState({ todoText: "" });
    }
    
    public render(): JSX.Element | null
    {
        console.log("Render in " + (this as Object).getTypeName());
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
                    </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.todoText}
                    />
                    <button>
                        Add #{this.state.todos.length + 1}
                    </button>
                </form>
            </div>
        );
    }
}
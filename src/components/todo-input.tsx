import * as React from "react";
import { ComponentBase } from "../base/component-base";
import { TodoService } from "../services/todo/todo-service";
import { Todo } from "../models/todo";
import { Provider } from "../providers/provider";


type State = {
    todos: ReadonlyArray<Todo>;
    todoText: string;
}

export class TodoInput extends ComponentBase<any, State>
{
    private readonly _todoService: TodoService;
    
    
    public constructor(props: any)
    {
        super(props);

        this.state = {
            todos: [],
            todoText: ""
        };
        
        this._todoService = Provider.global.resolve("TodoService");
        
        this.initialize();
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

        await this._todoService.createTodo(this.state.todoText);
        
        this.setState({ todoText: "" });
    }
    
    public render(): JSX.Element | null
    {
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
    
    private initialize(): void
    {
        this.executeAfterMount(() =>
        {
            const subs = [
                this._todoService.todos.subscribe((todos) => this.setState({ todos }))
            ];

            this.executeBeforeUnmount(() => subs.forEach(t => t.unsubscribe()));
        });
    }
}
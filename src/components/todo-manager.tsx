import { Todo } from "../models/todo";
import * as React from "react";
import { ComponentBase } from "./component-base";
import { TodoList } from "./todo-list";


type State = {
    items: Array<Todo>;
    text: string;
};


export class TodoManager extends ComponentBase<any, State>
{
    public constructor(props: any)
    {
        super(props, { items: [], text: "gg" });
        // this.state = { items: [], text: '' };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render(): JSX.Element 
    {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
                    </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
            </div>
        );
    }

    public handleChange(e: React.ChangeEvent<HTMLInputElement>): void
    {
        this.setState({ text: e.target.value });
    }

    public handleSubmit(e: React.FormEvent<HTMLFormElement>): void
    {
        e.preventDefault();
        if (this.state.text.length === 0) 
            return;
        
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: "hh"
        }));
    }
}
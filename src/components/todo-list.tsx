import * as React from "react";
import { ComponentBase } from "../base/component-base";
import { Todo } from "../models/todo";


type Props = {
    items: ReadonlyArray<Todo>;
};

export class TodoList extends ComponentBase<Props>
{
    public render(): JSX.Element | null
    {
        return (
            <ul>
                {this.props.items.map(item => <li key={item.id}>{item.text}</li>)}
            </ul>
        );
    }
}
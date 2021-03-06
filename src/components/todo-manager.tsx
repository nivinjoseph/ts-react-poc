import * as React from "react";
import { ComponentBase } from "../base/component-base";
import { TodoList } from "./todo-list";
import { TodoInput } from "./todo-input";


export class TodoManager extends ComponentBase
{
    public render(): JSX.Element
    {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList/>
                <TodoInput/>
            </div>
        );
    }
}
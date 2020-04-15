import * as React from "react";
import { Hello } from "./components/hello";
import { hot } from "react-hot-loader/root";
import { TodoManager } from "./components/todo-manager";
import { ComponentBase } from "./base/component-base";


class App extends ComponentBase
{
    public render(): JSX.Element
    {
        return (
            <div>
                <Hello compiler="TypeScript" framework="React" />
                <TodoManager />
            </div>
        );
    }
}


export default hot(App);
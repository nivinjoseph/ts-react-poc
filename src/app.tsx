import * as React from "react";
import { Hello } from "./components/hello";
import { hot } from "react-hot-loader/root";
import { TodoManager } from "./components/todo-manager";
import { ConfigurationManager } from "@nivinjoseph/n-config";
import { ComponentBase } from "./base/component-base";


class App extends ComponentBase
{
    public constructor(props: any)
    {
        super(props);
        
        const config = {} as any;
        config.foo = ConfigurationManager.getConfig("foo");
        config.bar = ConfigurationManager.getConfig("bar");
        config.baz = ConfigurationManager.getConfig("baz");

        console.dir(config);

        // console.log(ConfigurationManager);
    }
    
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
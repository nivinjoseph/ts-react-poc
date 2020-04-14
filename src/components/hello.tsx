import * as React from "react";
import { ComponentBase } from "../base/component-base";


type Props = {
    compiler: string;
    framework: string;
};


export class Hello extends ComponentBase<Props>
{
    public render(): JSX.Element
    {
        console.log("Render in " + (this as Object).getTypeName());
        
        return <h1>Hello from the {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
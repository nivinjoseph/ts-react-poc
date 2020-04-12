import * as React from "react";
import { ComponentBase } from "./component-base";


type Props = {
    compiler: string;
    framework: string;
};

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends ComponentBase<Props>
{
    public render(): JSX.Element
    {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
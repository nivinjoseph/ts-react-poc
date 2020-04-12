import * as React from "react";
import { given } from "@nivinjoseph/n-defensive";


export abstract class ComponentBase<P extends object = {}, S extends object = {}, SS = any> extends React.Component<P, S, SS>
{
    protected constructor(props: P, initState: S)
    {
        super(props);
        
        given(initState, "initState").ensureHasValue().ensureIsObject();
        this.state = initState;
    }
}
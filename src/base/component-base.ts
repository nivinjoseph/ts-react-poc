import * as React from "react";
import { Utilities } from "./utilities";


export abstract class ComponentBase<P extends object = {}, S extends object = {}, SS = any> extends React.Component<P, S, SS>
{
    protected constructor(props: P)
    {
        super(props);
        
        Utilities.getPropertyInfos(this).forEach(propertyInfo =>
        {
            if (typeof (propertyInfo.descriptor.value) === "function")
                (this as any)[propertyInfo.name] = propertyInfo.descriptor.value.bind(this);
        });
    }
    
    public abstract render(): JSX.Element | null;
}
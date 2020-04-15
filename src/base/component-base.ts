import * as React from "react";
import { Utilities } from "./utilities";
import { given } from "@nivinjoseph/n-defensive";


export abstract class ComponentBase<P extends object = {}, S extends object = {}, SS = any> extends React.Component<P, S, SS>
{
    private _afterMountFunc: (() => any) | null = null;
    private _afterUpdateFunc: (() => any) | null = null;
    private _beforeUnmountFunc: (() => any) | null = null;
    
    
    protected constructor(props: P)
    {
        super(props);
        
        Utilities.getPropertyInfos(this).forEach(propertyInfo =>
        {
            if (typeof (propertyInfo.descriptor.value) === "function")
                (this as any)[propertyInfo.name] = propertyInfo.descriptor.value.bind(this);
        });
    }
    
    
    public abstract render(): React.ReactNode | null;
    
    public componentDidMount(): any
    {
        if (this._afterMountFunc)
            this._afterMountFunc();
    }
    
    public componentDidUpdate(): any
    {
        if (this._afterUpdateFunc)
            this._afterUpdateFunc();
    }
    
    public componentWillUnmount(): any
    {
        if (this._beforeUnmountFunc)
            this._beforeUnmountFunc();
    }
    
    protected executeAfterMount(func: () => any): void
    {
        given(func, "func").ensureHasValue().ensureIsFunction();
        this._afterMountFunc = func;
    }
    
    protected executeAfterUpdate(func: () => any): void
    {
        given(func, "func").ensureHasValue().ensureIsFunction();
        this._afterUpdateFunc = func;
    }
    
    protected executeBeforeUnmount(func: () => any): void
    {
        given(func, "func").ensureHasValue().ensureIsFunction();
        this._beforeUnmountFunc = func;
    }
}
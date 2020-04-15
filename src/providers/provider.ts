import { ServiceLocator, Container } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { DefaultInstaller } from "./default-installer";


export class Provider
{
    private static _global: ServiceLocator;
    
    
    public static get global(): ServiceLocator { return this._global; }
    
    /**
     * @static
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { }
    
    public static initialize(): void
    {
        given(this, "this").ensure(() => !this._global, "already initialized");
        
        const container = new Container();
        container
            .install(new DefaultInstaller())
            .bootstrap();
        
        this._global = container;
    }
}
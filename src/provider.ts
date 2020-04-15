import { ServiceLocator, ComponentInstaller, Registry, Container } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { InMemoryTodoService } from "./services/todo/in-memory-todo-service";


class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        given(registry, "registry").ensureHasValue().ensureIsObject();

        registry.registerSingleton("TodoService", InMemoryTodoService);
    }
}


export class Provider
{
    private static _global: ServiceLocator;
    
    
    public static get global(): ServiceLocator { return this._global; }
    
    
    public static initialize(): void
    {
        given(this, "this").ensure(() => !this._global, "already initialized");
        
        const container = new Container();
        container
            .install(new Installer())
            .bootstrap();
        
        this._global = container;
    }
}
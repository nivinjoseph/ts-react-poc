import { ComponentInstaller, Registry } from "@nivinjoseph/n-ject";
import { given } from "@nivinjoseph/n-defensive";
import { InMemoryTodoService } from "../services/todo/in-memory-todo-service";


export class DefaultInstaller implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        given(registry, "registry").ensureHasValue().ensureIsObject();

        registry.registerSingleton("TodoService", InMemoryTodoService);
    }
}
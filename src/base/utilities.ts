import { ApplicationException } from "@nivinjoseph/n-exception";
import "@nivinjoseph/n-ext";


export class Utilities
{    
    private static internal = new Set(["isReactComponent", "setState", "forceUpdate", "isMounted", "replaceState", "render",
        "hotComponentRender", "hotComponentUpdate", "componentDidMount", "componentDidUpdate", "componentWillUnmount",
        "props", "context", "refs", "updater", "state", "executeAfterMount", "executeBeforeUnmount"]);

    private static forbidden = new Set(["do", "if", "for", "let", "new", "try", "var", "case", "else", "with", "await", "break",
        "catch", "class", "const", "super", "throw", "while", "yield", "delete", "export", "import", "return",
        "switch", "default", "extends", "finally", "continue", "debugger", "function", "arguments", "typeof", "void"]);


    public static getPropertyInfos(val: any): Array<PropertyInfo>
    {
        const propertyInfos = new Array<PropertyInfo>();
        const prototype = Object.getPrototypeOf(val);
        if (prototype === undefined || prototype === null)  // we are dealing with Object
            return propertyInfos;

        propertyInfos.push(...Utilities.getPropertyInfos(prototype));

        const propertyNames = Object.getOwnPropertyNames(val);
        for (let name of propertyNames)
        {
            name = name.trim();
            if (name === "constructor" || name.startsWith("_") || name.startsWith("$") || Utilities.internal.has(name))
                continue;

            if (Utilities.forbidden.has(name))
                throw new ApplicationException(`Class ${(val as Object).getTypeName()} has a member with the forbidden name '${name}'. The following names are forbidden: ${Utilities.forbidden}.`);

            const descriptor = Object.getOwnPropertyDescriptor(val, name);
            propertyInfos.push({name, descriptor: descriptor as PropertyDescriptor});
        }

        return propertyInfos;
    }
}


export interface PropertyInfo
{
    readonly name: string;
    readonly descriptor: PropertyDescriptor;
} 
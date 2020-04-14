"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const component_base_1 = require("../base/component-base");
const todo_service_1 = require("../services/todo-service");
class TodoList extends component_base_1.ComponentBase {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.executeAfterMount(() => {
            const subscription = todo_service_1.TodoService.instance.todos.subscribe((todos) => this.setState({ items: todos }));
            this.executeBeforeUnmount(() => subscription.unsubscribe());
        });
    }
    handleDelete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield todo_service_1.TodoService.instance.deleteTodo(id);
        });
    }
    render() {
        console.log("Render in " + this.getTypeName());
        return (<ul>
                {this.state.items.map(item => (<li key={item.id}>
                        <span>{item.text}</span><span>-----</span>
                        <button onClick={() => this.handleDelete(item.id)}>
                            Delete
                        </button>
                    </li>))}
            </ul>);
    }
}
exports.TodoList = TodoList;
//# sourceMappingURL=todo-list.jsx.map
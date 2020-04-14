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
class TodoInput extends component_base_1.ComponentBase {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            todoText: ""
        };
        this.executeAfterMount(() => {
            const subs = [
                todo_service_1.TodoService.instance.todos.subscribe((todos) => this.setState({ todos }))
            ];
            this.executeBeforeUnmount(() => subs.forEach(t => t.unsubscribe()));
        });
    }
    handleChange(e) {
        this.setState({ todoText: e.target.value });
    }
    handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if (this.state.todoText.length === 0)
                return;
            yield todo_service_1.TodoService.instance.createTodo(this.state.todoText);
            this.setState({ todoText: "" });
        });
    }
    render() {
        console.log("Render in " + this.getTypeName());
        return (<div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
                    </label>
                    <input id="new-todo" onChange={this.handleChange} value={this.state.todoText}/>
                    <button>
                        Add #{this.state.todos.length + 1}
                    </button>
                </form>
            </div>);
    }
}
exports.TodoInput = TodoInput;
//# sourceMappingURL=todo-input.jsx.map
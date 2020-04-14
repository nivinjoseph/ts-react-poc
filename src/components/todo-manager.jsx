"use strict";
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
const todo_list_1 = require("./todo-list");
const todo_input_1 = require("./todo-input");
class TodoManager extends component_base_1.ComponentBase {
    render() {
        console.log("Render in " + this.getTypeName());
        return (<div>
                <h3>TODO</h3>
                <todo_list_1.TodoList />
                <todo_input_1.TodoInput />
            </div>);
    }
}
exports.TodoManager = TodoManager;
//# sourceMappingURL=todo-manager.jsx.map
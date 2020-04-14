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
class TodoList extends component_base_1.ComponentBase {
    render() {
        return (<ul>
                {this.props.items.map(item => <li key={item.id}>{item.text}</li>)}
            </ul>);
    }
}
exports.TodoList = TodoList;
//# sourceMappingURL=todo-list.jsx.map
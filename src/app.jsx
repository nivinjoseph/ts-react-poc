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
const hello_1 = require("./components/hello");
const root_1 = require("react-hot-loader/root");
const todo_manager_1 = require("./components/todo-manager");
const component_base_1 = require("./base/component-base");
class App extends component_base_1.ComponentBase {
    render() {
        return (<div>
                <hello_1.Hello compiler="TypeScript" framework="React"/>
                <todo_manager_1.TodoManager />
            </div>);
    }
}
exports.default = root_1.hot(App);
//# sourceMappingURL=app.jsx.map
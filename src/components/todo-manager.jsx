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
class TodoManager extends component_base_1.ComponentBase {
    constructor(props) {
        super(props);
        this.state = { items: [], text: "gg" };
        // this.state = { items: [], text: '' };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (<div>
                <h3>TODO</h3>
                <todo_list_1.TodoList items={this.state.items}/>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
                    </label>
                    <input id="new-todo" onChange={this.handleChange} value={this.state.text}/>
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
            </div>);
    }
    handleChange(e) {
        this.setState({ text: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0)
            return;
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: "hh"
        }));
    }
}
exports.TodoManager = TodoManager;
//# sourceMappingURL=todo-manager.jsx.map
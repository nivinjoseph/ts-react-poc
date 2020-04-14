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
const n_config_1 = require("@nivinjoseph/n-config");
const component_base_1 = require("./base/component-base");
class App extends component_base_1.ComponentBase {
    constructor(props) {
        super(props);
        const config = {};
        config.foo = n_config_1.ConfigurationManager.getConfig("foo");
        config.bar = n_config_1.ConfigurationManager.getConfig("bar");
        config.baz = n_config_1.ConfigurationManager.getConfig("baz");
        console.dir(config);
        // console.log(ConfigurationManager);
    }
    render() {
        return (<div>
                <hello_1.Hello compiler="TypeScript" framework="React"/>
                <todo_manager_1.TodoManager />
            </div>);
    }
}
exports.default = root_1.hot(App);
//# sourceMappingURL=app.jsx.map
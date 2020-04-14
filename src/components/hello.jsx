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
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
class Hello extends component_base_1.ComponentBase {
    render() {
        return <h1>Hello from the {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
exports.Hello = Hello;
//# sourceMappingURL=hello.jsx.map
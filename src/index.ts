import "@babel/polyfill";
import "@nivinjoseph/n-ext";
import "react-hot-loader";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import { Provider } from "./providers/provider";
import { ConfigurationManager } from "@nivinjoseph/n-config";


const config = {} as any;
config.foo = ConfigurationManager.getConfig("foo");
config.bar = ConfigurationManager.getConfig("bar");
config.baz = ConfigurationManager.getConfig("baz");
console.dir(config);


Provider.initialize();
 
ReactDOM.render(React.createElement(App), document.getElementById("root"));
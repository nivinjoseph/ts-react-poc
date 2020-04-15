import "@babel/polyfill";
import "@nivinjoseph/n-ext";
import "react-hot-loader";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import { Provider } from "./provider";


Provider.initialize();
 
ReactDOM.render(React.createElement(App), document.getElementById("root"));
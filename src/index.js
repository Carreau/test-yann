import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from './App';
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@myst-theme/providers";
import { MyST, DEFAULT_RENDERERS } from "myst-to-react";

import {fromMarkdown} from 'mdast-util-from-markdown'

const SignatureRenderer = ({ node }) => {
  return (
    <>
      <div className="flex my-5 group">
        <div className="flex-grow overflow-x-auto overflow-y-hidden" />
        {node.value}
      </div>
      <div>
        <MyST ast={node.children} />
      </div>
    </>
  );
};

const LOC = { signature: SignatureRenderer };
const RENDERERS = { ...DEFAULT_RENDERERS, ...LOC };

function MyComponent({ node }) {
  console.log("Node", node);
  return (
    <ThemeProvider renderers={RENDERERS}>
      <MyST ast={node.children} />
    </ThemeProvider>
  );
}

const tree = fromMarkdown('Some *emphasis*, **strong**, and `code`.')
const mytree = {
  type: 'admonition',
  children: [
    { type: "text", value: "myValue" },
    {
      type: "signature",
      value: "Foo",
      children: [{ type: "text", value: "Child" }],
    },
  ],
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MyComponent node={tree} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

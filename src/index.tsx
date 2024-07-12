import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.Fragment>
    <Provider store={store}>
      <TonConnectUIProvider manifestUrl="https://telegram-react-test.netlify.app/tonconnect-manifest.json">
        <App />
      </TonConnectUIProvider>
    </Provider>
  </React.Fragment>
);

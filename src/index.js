import React from "react";
import ReactDOM from "react-dom";
// Redux imports and configuring store
import { Provider } from "react-redux";
import configureStore from "./store";
// react intl
import { IntlProvider, addLocaleData } from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_fr from "react-intl/locale-data/fr";
// Translations
import messages_fr from "./translations/fr.json";
import messages_en from "./translations/en.json";
// Component and Service Worker
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
// Style Sheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/stylesheets/main.scss";

addLocaleData([...locale_en, ...locale_fr]);

const messages = {
  en: messages_en,
  fr: messages_fr
};
// Creating REDUX store with the required configurations
const store = configureStore();

// Language without Region Code
const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <Provider store={store}>
      <App />
    </Provider>
  </IntlProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();

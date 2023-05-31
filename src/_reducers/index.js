import { combineReducers } from "redux";
import auth from "./auth";
import element from "./element";
import application from "./application";
import verification from "./verification";

export default combineReducers({
  auth,
  element,
  application,
  verification
});

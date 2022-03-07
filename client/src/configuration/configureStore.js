import { createStore, applyMiddleware } from "redux";
import combineReducer from "./combineReducer";
import Thunk from "redux-thunk";

export default function configureStore(state) {
  return createStore(combineReducer, state, applyMiddleware(Thunk));
}

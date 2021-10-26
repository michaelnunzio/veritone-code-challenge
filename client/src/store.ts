import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as appReducer } from "./reducer";
import { createLogger } from "redux-logger";

const reducers = combineReducers({
  app: appReducer,
});

export type IAppState = ReturnType<typeof reducers>;

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(createLogger()))
);

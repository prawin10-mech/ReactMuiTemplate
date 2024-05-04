import { combineReducers } from "redux";
// slices
import dummyReducer from "./slices/dummyReducer";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  dummy: dummyReducer,
});

export default rootReducer;

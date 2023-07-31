import { createStore, combineReducers } from "redux";
import { formReducer } from "./form-reducer/form.reducer";
const rootReducer = combineReducers({
    formReducer,
});
export const store = createStore(rootReducer);

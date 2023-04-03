import { combineReducers } from "redux";

import { authReducer, popupReducer, cartReducer } from "./reducer";

export const allReducers = combineReducers({
    authReducer,
    popupReducer,
    cartReducer
    // add more reducers here
});



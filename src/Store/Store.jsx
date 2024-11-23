import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducer";

const store= configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store
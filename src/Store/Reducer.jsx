import { createReducer } from "@reduxjs/toolkit";
import {login, logout, register} from './Action.jsx'

const initialState={
    isRegister: false,
    isLogin: false,
    userData: null,
}

const authReducer= createReducer(initialState, (builder)=>{
    builder
    .addCase(register,(state, action)=>{
        state.isRegister= true
        state.isLogin= true
        state.userData= action.payload;
    })
    .addCase(login,(state, action)=>{
        state.isRegister= false
        state.isLogin= true
        state.userData= action.payload;
    })
    .addCase(logout, (state)=>{
        state.isRegister= false
        state.isLogin=false
        state.userData=null
    })
})

export default authReducer
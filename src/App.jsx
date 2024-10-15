import React from "react";
import { BrowserRouter } from "react-router-dom"; 
import { Provider } from "react-redux"; 
import AppRouter from "./AppRoutes";
import store from './Store/Store';  
import "./App.css";

function App() {
  return (
    <Provider store={store}> 
      <BrowserRouter> 
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

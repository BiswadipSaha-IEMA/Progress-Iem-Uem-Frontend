import React from "react";
import { BrowserRouter } from "react-router-dom"; 
import { Provider } from "react-redux"; 
import AppRouter from "./AppRoutes";
import store from './Store/Store';  
import "./App.css";
import { ErrorPopupProvider } from "./hooks/useHttp";

function App() {
  return (
    <Provider store={store}> 
      <BrowserRouter> 
      <ErrorPopupProvider>
        <AppRouter />
      </ErrorPopupProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

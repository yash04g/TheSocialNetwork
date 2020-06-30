import React from "react";
import MainRouter from "./MainRouter"
import {BrowserRouter} from "react-router-dom"

const App = ()=>{
    return(
        <BrowserRouter>
            <MainRouter />
        </BrowserRouter>
    )
}

export default App;
import { useState } from "react";
import { FormLoginComponent } from "../src/components/FormLoginComponent/FormLoginComponent.jsx";
import { DashboardComponent } from "./Dashboard";


export const IndexPage = () => {
    
    const [isLogged, setIsLogged] = useState(localStorage.getItem("login"))

    return(<>
    { 
        isLogged === "true" ?  (<><DashboardComponent/></>) : 
        
        (<>
        <title>Pagina Login</title><FormLoginComponent/></>)
    }
    </>)

}
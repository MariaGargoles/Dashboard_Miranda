import { useState, useEffect } from "react";
import { FormLoginComponent } from "../components/FormLoginComponent/FormLoginComponent.jsx";
import { DashboardPage } from "./Dashboard.jsx";



export const IndexPage = () => {
    
    const [isLogged, setIsLogged] = useState(localStorage.getItem("login"))
    useEffect(() => {
        setIsLogged(localStorage.getItem("login"));
    }, []);

    const handleLogin = () => {
        setIsLogged("true");
        localStorage.setItem("login", "true");
    };

    return (
        <>
            {isLogged === "true" ? (
                <DashboardPage />
            ) : (
                <>
                    <title>Pagina Login</title>
                    <FormLoginComponent onLogin={handleLogin} />
                </>
            )}
        </>
    );
};


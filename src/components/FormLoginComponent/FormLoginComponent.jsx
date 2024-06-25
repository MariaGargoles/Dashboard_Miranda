import React from "react"
import "FormLoginComponent.css"



export const FormLoginComponent = () => {

    const loginFormHandler = (event) => {
        event.preventDefault()
        let username = "maria";
        let pasword = "miranda"
        if (username === event.target.username.value && password === event.target.password.value)
            console.log("login")
        else
            alert("Datos incorrectos")

    }


    return <>
    <main>
    <img></img>
    <form onSubmit={loginFormHandler}>
        <input type="text" name="username" placeholder="username"/>
        <input type="password" name="password" placeholder="password"/>
        <input type="submit" />
    </form>
    </main>
    </>

}


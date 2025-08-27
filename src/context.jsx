import React from "react";
import { createContext, useEffect, Children, useContext } from "react";
import useFetch from "./hooks/use-fetch";
import { getCurrentUser } from "./db/auth";

const UserContext = createContext()

function UserProvider ({children})
{
    // console.log ("user context -> fetch user")
    const {data, loading, error, fn: fetchUser} = useFetch(getCurrentUser)
    const isAuthenticated = data?.role === "authenticated"

    useEffect (()=>
    {
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{data, error, loading, fetchUser, isAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}

export function UserState ()
{
    return useContext(UserContext)
}

export default UserProvider
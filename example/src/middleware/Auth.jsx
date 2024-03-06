import React from 'react';
import Loader from "../components/Loader.jsx";
import {useSelector} from "rsl-redux";
import {Navigate} from "react-router-dom";


function AccessDenied(){
    return (
        <div>
            askdfjksdjf
            <h2>Access Denied111111111111111</h2>
        </div>
    )
}

const Auth = ({accessRoles, children}) => {
    const {auth, authLoaded} = useSelector(state => state.authState)
    console.log(auth)
    if (!authLoaded && !auth) {
        return (
            <div>
                <Loader
                    titleClass="text-center w-[600px] mt-5 text-white font-semibold"
                    title="Checking access permissions"
                />
            </div>
        )
    } else if (authLoaded && auth) {

        if(accessRoles && accessRoles.includes(auth.role)){
            return children
        } else {
            return <AccessDenied />
        }

    } else {
        return  <Navigate to="/login" />
    }
};

export default Auth;
import React from 'react'
import {useSelector} from "react-redux";

export const DashboardScreen = () => {

    const {user} = useSelector(state => state.auth)
    return (
        <div className={"m-5"}>
            <h1>Pagina en Construccion</h1>
            <p><strong>{user.name}</strong> estamos trabajando para agregarla a la brevedad.</p>
        </div>
    )
}

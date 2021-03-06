import React from 'react'
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {toastDismiss} from "../../config/toastConfig";

export const DashboardScreen = () => {

    const {user} = useSelector(state => state.auth);
    const history = useHistory();
    const {addToast} = useToasts();

    const handleLogout = () => {
        localStorage.clear();
        history.push('/auth/login')
        addToast('Sesion cerrada correctamente.', {appearance: 'success' , ...toastDismiss});
    }

    return (
        <div className={"container-fluid p-5"}>
            <h1>Pagina en Construccion</h1>
            <p><strong>{user?.name}</strong> estamos trabajando para agregarla a la brevedad.</p>
            <button type='button' className={'btn btn-secondary'} onClick={handleLogout}>
                <span>Logout</span>
            </button>
        </div>
    )
}

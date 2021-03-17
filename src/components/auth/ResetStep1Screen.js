// *****************************************************************
//                                              Imports
// *****************************************************************
import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import {useForm} from '../../hooks/useForm';
import {types} from "../../types/types";
import {resetStep1} from "../../services/resetPasswordService";
import { BeatLoader} from "react-spinners";
import {toastDismiss} from "../../config/toastConfig";

export const ResetStep1Screen = () => {

    // *****************************************************************
    //                                              Hooks
    // *****************************************************************
    const {addToast} = useToasts();
    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [formValues, handleInputChange] = useForm({ email: '' });
    const {email} = formValues

    // Form Hooks
    const [emailError, setEmailError] = useState('');
    const [submit, setSubmit] = useState(false);

    // *****************************************************************
    //                                              Form Validation
    // *****************************************************************
    const validateUsername = () => {
        let response = {isValid: true, message: ''};
        if (!email) {
            response.message = 'Este campo es requerido.';
            response.isValid = false;
        } else if (!email.includes('@') || !email.includes('.')) {
            response.message = 'Correo no valido.';
            response.isValid = false;
        }
        return response;
    }

    const isValidForm = () => {
        let valid = true;

        const usernameValidator = validateUsername();
        if ( ! usernameValidator.isValid ) {
            setEmailError(usernameValidator.message);
            valid = false;
        } else {
            setEmailError('');
        }

        return valid;
    }

    // *****************************************************************
    //                                              Handlers
    // *****************************************************************
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true);

        //Validaciones de formulario
        if (!isValidForm()) {
            // addToast('Hay algunos errores.', {appearance: 'error'});
            return
        }

        setLoading(true)
        const response = await resetStep1(email);
        setLoading(false)

        if (response.ok) {
            dispatch({type: types.resetPassword1Success, payload: email})
            history.push('/auth/reset-password/step2')
            addToast(response.message, {appearance: 'success' , ...toastDismiss});
        } else {
            dispatch({type: types.resetPassword1Failure})
            addToast(response.message, {appearance: 'error' , ...toastDismiss});
        }
    }

    // *****************************************************************
    //                                              JSX
    // *****************************************************************
    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-header text-center">
                    Cambio de Contraseña (paso 1)
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Correo electrónico</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Correo electrónico"
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        {(emailError && submit) && <div className={'auth__input_error'}>{emailError}</div>}
                    </div>
                </div>
                <div className="card-footer text-muted text-center">
                    <button type='submit' className={'btn btn-secondary btn-block'} disabled={loading}>
                        { !loading
                            ? <span>Enviar Código</span>
                            : <BeatLoader loading={true} color={"white"} size={10}/>
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}
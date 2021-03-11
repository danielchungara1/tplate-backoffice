// *****************************************************************
//                                              Imports
// *****************************************************************
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import {types} from "../../types/types";
import {useToasts} from "react-toast-notifications";
import {useHistory} from "react-router-dom";
import {signUp} from "../../services/signUpService";
import {BeatLoader} from "react-spinners";

export const RegisterScreen = () => {

    // *****************************************************************
    //                                              Hooks
    // *****************************************************************
    const {addToast} = useToasts();
    const history = useHistory()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);

    // Form Hooks
    const [formValues, handleInputChange] = useForm({ username: '',  password: ''});
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submit, setSubmit] = useState(false);
    const { username, password} = formValues

    // *****************************************************************
    //                                              Form Validation
    // *****************************************************************
    const validateUsername = () => {
        let response = {isValid: true, message: ''};
        if (!username) {
            response.message = 'Este campo es requerido.';
            response.isValid = false;
        } else if (!username.includes('@') || !username.includes('.')) {
            response.message = 'Formato de mail no valido.';
            response.isValid = false;
        }
        return response;
    }

    const validatePassword = () => {
        let response = {isValid: true, message: ''};
        if (!password) {
            response.message = 'Este campo es requerido.';
            response.isValid = false;
        } else if (password.length < 6 ) {
            response.message = 'Debe tener al menos 6 caracteres.';
            response.isValid = false;
        }
        return response;
    }

    const isValidForm = () => {
        let valid = true;

        const usernameValidator = validateUsername();
        if ( ! usernameValidator.isValid ) {
            setUsernameError(usernameValidator.message);
            valid = false;
        } else {
            setUsernameError('');
        }

        const passwordValidator = validatePassword();
        if ( ! passwordValidator.isValid ) {
            setPasswordError(passwordValidator.message);
            valid = false;
        } else {
            setPasswordError('');
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

        // Webservice connection
        setLoading(true)
        const response = await signUp(username, password);
        setLoading(false)

        if (response.ok) {
            dispatch({type: types.loginSuccess, payload: response.data})
            history.push('/auth/login')
            addToast(response.message, {appearance: 'success'});
        } else {
            dispatch({type: types.loginFailure})
            addToast(response.message, {appearance: 'error'});
        }
    }

    // *****************************************************************
    //                                              JSX
    // *****************************************************************
    return (
        <form onSubmit={handleSubmit} >
            <div className="card">
                <div className="card-header text-center">
                    SIGN UP
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Username"
                            name='username'
                            value={username}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        {(usernameError && submit) && <div className={'auth__input_error'}>{usernameError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Password</label>
                        <input
                            className="form-control password"
                            type="text"
                            placeholder="Password"
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        {(passwordError && submit) && <div className={'auth__input_error'}>{passwordError}</div>}
                    </div>
                </div>
                <div className="card-footer text-muted text-center">
                    <button type='submit' className={'btn btn-secondary btn-block'} disabled={loading}>
                        {!loading
                            ? <span>Sign up</span>
                            : <BeatLoader loading={true} color={"white"} size={10}/>
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}

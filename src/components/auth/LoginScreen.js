// *****************************************************************
//                                              Imports
// *****************************************************************
import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import {useForm} from '../../hooks/useForm';
import {login} from '../../services/loginService';
import {types} from "../../types/types";
import {BeatLoader} from "react-spinners";

export const LoginScreen = () => {

    // *****************************************************************
    //                                              Hooks
    // *****************************************************************
    const {addToast} = useToasts();
    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState(false);

    // Form Hooks
    const [{username, password}, handleInputChange] = useForm({username: '', password: ''});
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submit, setSubmit] = useState(false);

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
    const handleRecuperarPassword = () => {
        history.push('/auth/reset-password/step1')
    }

    const handleCrearCuenta = () => {
        history.push('/auth/register')
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmit(true);

        //Validaciones de formulario
        if (!isValidForm()) {
            // addToast('Hay algunos errores.', {appearance: 'error'});
            return
        }

        //Request
        setLoading(true)
        const response = await login(username, password);
        setLoading(false)

        if (response.ok) {
            dispatch({type: types.loginSuccess, payload: response.data})
            addToast(response.message, {appearance: 'success'});
            localStorage.setItem('token', response.data.token)
            history.push('/dashboard')
        } else {
            dispatch({type: types.loginFailure})
            addToast(response.message, {appearance: 'error'});
        }

    }

    // *****************************************************************
    //                                              JSX
    // *****************************************************************
    return (
        <form onSubmit={handleLogin}>
            <div className="card">
                <div className="card-header text-center">
                    TPLATE
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
                    <div className={'auth_links_container'}>
                        <button className="btn btn-link pl-0" type={"button"} onClick={handleRecuperarPassword}>
                            <span className="text-dark auth_links_text">Recuperar Password</span>
                        </button>
                        <button className="btn btn-link pr-0" type={"button"} onClick={handleCrearCuenta}>
                            <span className="text-dark auth_links_text">Crear cuenta</span>
                        </button>
                    </div>

                </div>
                <div className="card-footer text-muted text-center">
                    <button type='submit' className={'btn btn-secondary btn-block'} disabled={loading}>
                        {!loading
                            ? <span>Login</span>
                            : <BeatLoader loading={true} color={"white"} size={10}/>
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}
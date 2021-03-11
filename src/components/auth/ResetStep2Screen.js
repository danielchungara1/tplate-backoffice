// *****************************************************************
//                                              Imports
// *****************************************************************
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import {useForm} from '../../hooks/useForm';
import {types} from "../../types/types";
import {resetStep2} from "../../services/resetPasswordService";

export const ResetStep2Screen = () => {

    // *****************************************************************
    //                                              Hooks
    // *****************************************************************
    const {addToast} = useToasts();
    const dispatch = useDispatch()
    const history = useHistory()
    const resetEmail = useSelector(state => state.auth.resetEmail)

    // Form Hooks
    const [formValues, handleInputChange] = useForm({ code:'', password: '' });
    const {code, password} = formValues
    const [codeError, setCodeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [submit, setSubmit] = useState(false);

    // *****************************************************************
    //                                              Form Validation
    // *****************************************************************
    const validateCode = () => {
        let response = {isValid: true, message: ''};
        if (!code) {
            response.message = 'Este campo es requerido.';
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

        const codeValidator = validateCode();
        if ( ! codeValidator.isValid ) {
            setCodeError(codeValidator.message);
            valid = false;
        } else {
            setCodeError('');
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

        const response = await resetStep2(resetEmail, code, password);

        if (response.ok) {
            dispatch({type: types.resetPassword2Success, payload: response.data})
            history.push('/auth/login')
            addToast(response.message, {appearance: 'success'});
        } else {
            dispatch({type: types.resetPassword2Failure})
            addToast(response.message, {appearance: 'error'});
        }

    }

    // *****************************************************************
    //                                              JSX
    // *****************************************************************
    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-header text-center">
                    Recuperar Password (paso 2)
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Codigo</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Codigo"
                            name='code'
                            value={code}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        {(codeError && submit) && <div className={'auth__input_error'}>{codeError}</div>}
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
                    <button type='submit' className={'btn btn-secondary btn-block'}>Modificar Password</button>
                </div>
            </div>
        </form>
    )
}
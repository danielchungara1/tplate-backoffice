import React, {Fragment} from 'react'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import {useForm} from '../../hooks/useForm';
import {login} from '../../services/loginService';
import {types} from "../../types/types";

export const ResetStep1Screen = () => {

    const initialForm = {
        username: '',
    };

    const {addToast} = useToasts();
    const dispatch = useDispatch()
    const history = useHistory()

    const [formValues, handleInputChange] = useForm(initialForm);
    const {username} = formValues

    const handleSubmit = async (e) => {
        e.preventDefault()

        // const response = await login(username, password);
        //
        // if (response.ok) {
        //     dispatch({type: types.loginSuccess, payload: response.data})
        //     history.push('/home')
        //     addToast(response.message, {appearance: 'success'});
        // } else {
        //     dispatch({type: types.loginFailure})
        //     addToast(response.message, {appearance: 'error'});
        // }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-header text-center">
                    Reset Password Paso 1
                </div>
                <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username o Email</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="email@any.com"
                                name='username'
                                value={username}
                                onChange={handleInputChange}
                            />
                        </div>
                </div>
                <div className="card-footer text-muted text-center">
                    <button type='submit' className={'btn btn-primary btn-block'}>Enviar codigo</button>
                </div>
            </div>
        </form>
    )
}
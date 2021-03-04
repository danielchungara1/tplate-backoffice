import React from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import {types} from "../../types/types";
import {useToasts} from "react-toast-notifications";
import {useHistory} from "react-router-dom";
import {signUp} from "../../services/signUpService";

export const RegisterScreen = () => {

    const initialForm = {
        username: '',
        password: ''
    };

    const [formValues, handleInputChange] = useForm(initialForm);

    const { username, password} = formValues

    const {addToast} = useToasts();
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Webservice connection
        const response = await signUp(username, password);
        if (response.ok) {
            dispatch({type: types.loginSuccess, payload: response.data})
            history.push('/auth/login')
            addToast(response.message, {appearance: 'success'});
        } else {
            dispatch({type: types.loginFailure})
            addToast(response.message, {appearance: 'error'});
        }
    }

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
                    </div>
                </div>
                <div className="card-footer text-muted text-center">
                    <button type='submit' className={'btn btn-secondary btn-block'}>Sign up</button>
                </div>
            </div>
        </form>
    )
}

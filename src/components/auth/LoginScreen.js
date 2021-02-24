import React from 'react'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import {useForm} from '../../hooks/useForm';
import {login} from '../../services/loginService';
import {types} from "../../types/types";


export const LoginScreen = () => {

    const initialForm = {
        username: '',
        password: ''
    };

    const {addToast} = useToasts();
    const dispatch = useDispatch()
    const history = useHistory()

    const [formValues, handleInputChange] = useForm(initialForm);
    const {username, password} = formValues

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await login(username, password);

        if ( response.ok ) {
            dispatch({ type: types.loginSuccess, payload: response.data })
            history.push('/home')
            addToast( response.message, { appearance: 'success' } );
        } else {
            dispatch({ type: types.loginFailure })
            addToast(response.message, { appearance: 'error' });
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    name='username'
                    value={username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

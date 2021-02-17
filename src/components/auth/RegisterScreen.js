import React from 'react'
import { useDispatch } from 'react-redux';
import { register } from '../../actions/registerActions';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const initialForm = {
        username: '',
        password: ''
    };

    const [formValues, handleInputChange] = useForm(initialForm);

    const { username, password } = formValues

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(username, password))
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

import React from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../actions/loginActions';
import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {

    const initialForm = {
        username: '',
        password: ''        
    };
    
    const [formValues, handleInputChange] = useForm(initialForm);

    const {username, password} = formValues

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
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

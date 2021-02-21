import React from 'react'
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { login } from '../../actions/loginActions';
import { useForm } from '../../hooks/useForm';


export const LoginScreen = () => {

    const { addToast } = useToasts();

    const initialForm = {
        username: '',
        password: ''        
    };
    
    const [formValues, handleInputChange] = useForm(initialForm);

    const {username, password} = formValues

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const value =  dispatch(login(username, password, addToast))
        
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

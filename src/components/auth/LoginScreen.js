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
    const [{username, password} , handleInputChange] = useForm({ username: '', password: ''});

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
        e.preventDefault()

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
                    <button className="btn btn-link " type={"button"} onClick={handleRecuperarPassword}>
                        <span className="text-dark">Recuperar Password</span>
                    </button>
                    <button className="btn btn-link" type={"button"} onClick={handleCrearCuenta}>
                        <span className="text-dark">Crear cuenta</span>
                    </button>
                </div>
                <div className="card-footer text-muted text-center">
                    <button type='submit' className={'btn btn-secondary btn-block'} disabled={loading}>
                        { !loading
                            ? <span>Login</span>
                            : <BeatLoader loading={true} color={"white"} size={10}/>
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}
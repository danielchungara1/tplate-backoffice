import React, {Fragment} from 'react'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import {useForm} from '../../hooks/useForm';
import {login} from '../../services/loginService';
import {types} from "../../types/types";
import {resetStep2} from "../../services/resetPasswordService";

export const ResetStep2Screen = () => {

    const initialForm = {
        code: '',
        password: '',
        email:''
    };

    const {addToast} = useToasts();
    const dispatch = useDispatch()
    const history = useHistory()

    const [formValues, handleInputChange] = useForm(initialForm);
    const {code, password, email} = formValues

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await resetStep2(email, code, password);

        if (response.ok) {
            dispatch({type: types.resetPassword2Success, payload: response.data})
            history.push('/auth/login')
            addToast(response.message, {appearance: 'success'});
        } else {
            dispatch({type: types.resetPassword2Failure})
            addToast(response.message, {appearance: 'error'});
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-header text-center">
                    Cambiar Password (paso 2)
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="card-footer text-muted text-center">
                    <button type='submit' className={'btn btn-secondary btn-block'}>Modificar Password</button>
                </div>
            </div>
        </form>
    )
}
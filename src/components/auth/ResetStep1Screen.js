import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';
import {useForm} from '../../hooks/useForm';
import {types} from "../../types/types";
import {resetStep1} from "../../services/resetPasswordService";
import { BeatLoader} from "react-spinners";

export const ResetStep1Screen = () => {

    const initialForm = {
        email: '',
    };

    const {addToast} = useToasts();
    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState(false);

    const [formValues, handleInputChange] = useForm(initialForm);
    const {email} = formValues

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        const response = await resetStep1(email);
        setLoading(false)

        if (response.ok) {
            dispatch({type: types.resetPassword1Success, payload: response.data})
            history.push('/auth/reset-password/step2')
            addToast(response.message, {appearance: 'success'});
        } else {
            dispatch({type: types.resetPassword1Failure})
            addToast(response.message, {appearance: 'error'});
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <div className="card-header text-center">
                    Recuperar Password (paso 1)
                </div>
                <div className="card-body">
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
                </div>
                <div className="card-footer text-muted text-center">
                    <button type='submit' className={'btn btn-secondary btn-block mb-1'} disabled={loading} >
                        Enviar codigo
                    </button>
                    <BeatLoader loading={loading} color={"gray"} size={10} margin={5} />
                </div>
            </div>
        </form>
    )
}
import {axiosClient} from "../config/axiosConfig";

export const resetStep1 = async (email) => {

    const body = { 'email': email };

    try {
        const {data} = await axiosClient
            .post('/security/reset-password/step1', body);
        return {'ok': true, 'message': data.message, 'data': data.data};

    } catch ({response}) {
        let message = 'Error al cambiar contraseña.';
        if (response?.status === 409) {
            message = response.data.message;
        }
        return {'ok': false, 'message': message};
    }

}

export const resetStep2 = async (email, code, password) => {

    const body = { 'email': email, 'code': code, 'password': password};

    try {
        const {data} = await axiosClient
            .post('/security/reset-password/step2', body);
        return {'ok': true, 'message': data.message, 'data': data.data};

    } catch ({response}) {
        let message = 'Error al cambiar contraseña.';
        if (response?.status === 409) {
            message = response.data.message;
        }
        return {'ok': false, 'message': message};
    }

}

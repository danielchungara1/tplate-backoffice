import {axiosClient} from "../config/axiosConfig";

export const login = async (username, password) => {

    const credentials = {'username': username, 'password': password};

    try {
        const {data} = await axiosClient
            .post('/security/login', credentials);
        return {'ok': true, 'message': data.message, 'data': data.data};

    } catch ({response}) {
        let message = 'Error al loguear el usuario.';
        if (response?.status === 409) {
            message = response.data.message;
        }
        return {'ok': false, 'message': message};
    }

}

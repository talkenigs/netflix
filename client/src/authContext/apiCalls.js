import axios from 'axios';
import { loginFailure, loginStart, loginSuccess, logout } from './AuthActions';

export const login = async (user, dispatch) => {
    dispatch(loginStart());

    try {
        const res = await axios.post('auth/login', user);
        console.log(res);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.log(err.response.data);
        dispatch(loginFailure());
    }
};

export const logoutUser = (dispatch) => {
    dispatch(logout());
};

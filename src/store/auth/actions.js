import {decodeJwt, setDefaultAuthHeader, saveJwtToken} from "../../utils";
import {
    requestLogin,
    requestLoginSuccess,
    requestLoginError

} from './type';
import {api} from '../../utils';


export const reqLogin = userData => async dispatch => {
    try {
        dispatch({type: requestLogin});
        const res = await api.post("/auth/login", userData);
        const  {accessToken} = await res.data;
        const decoded = decodeJwt(accessToken);
        setDefaultAuthHeader(accessToken);
        saveJwtToken(accessToken);
        return dispatch({
            type: requestLoginSuccess,
            payload: decoded
        });
    } catch (error){
        dispatch({
            type: requestLoginError,
            payload: error
        });

    }
};
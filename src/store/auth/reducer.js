import {
    requestLogin,
    requestLoginSuccess,
    requestLoginError
} from "./type"

const intialState = {
    isAuthenticated: false,
    user: {},
    isLoading: false,
    error:{}
};

export function authReducers(state = intialState, action ){
    switch(action.type){
        case requestLogin :
            return {
                ...state,
                isLoading: true,
                error:{}
            };

        case requestLoginSuccess :
            return{
                ...state,
                user: action.payload,
                isAuthenticated: true,
                error: {},
                isLoading: false
            };

        case requestLoginError :
            return{
                ...state,
                isLoading:false,
                error: action.payload
            };
        default:
            return state;    
    }
}
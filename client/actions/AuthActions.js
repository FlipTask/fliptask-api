import API from "./../config/api";
import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_PENDING,
    USER_LOGIN_FAILURE,
    USER_LOGOUT
} from "./../constants/ActionTypes";

const appName = require("./../../package.json").name;

export const setAuthTokenInLocalStorage = (token) => async(dispatch,getState,api) => {
    dispatch(setHeaderInApi(token))
    // if(token){
    //     localStorage[`${appName}-isAuthorised`] = true;
    //     localStorage[`${appName}-jwttoken`] = token;
    // }else{
    //     delete localStorage[`${appName}-isAuthorised`]
    //     delete localStorage[`${appName}-jwttoken`];
    // }
}

export const setHeaderInApi = (token) => async(dispatch, getState, api) => {
    if(token){
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }else{
        delete API.defaults.headers.common["Authorization"];
    }
}

export const tryLogin = (obj = {}) => async(dispatch, getState, api) =>{
    try{
        dispatch({
            type: USER_LOGIN_PENDING
        });
        const res = await api.post('/user/login',{
            ...obj
        });
        dispatch(setAuthTokenInLocalStorage(res.data.data.token));
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.data
        });
        
    }catch(e){
        // console.log(e.response.data);
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: e.response.data
        });
    }
}

export const logout = () => async(dispatch, getState, api) => {
    const res = await api.get('/user/logout');
    dispatch({
        type: USER_LOGOUT
    });
    dispatch(setAuthTokenInLocalStorage());
}
import {
    FETCH_USER_PENDING,
    FETCH_USER_FAILURE,
    FETCH_USER_SUCCESS,
    
    //using for creating user //  no need to create new action types
    USER_LOGIN_SUCCESS,
    USER_LOGIN_PENDING,
    USER_LOGIN_FAILURE,
} from "./../constants/ActionTypes";
import {
    logout,
    setHeaderInApi,
    setAuthTokenInLocalStorage
} from "./AuthActions";

export const fetchUser = (fromServer) => async(dispatch, getState, api) => {
    // console.log("fromserver",fromServer);
    try{
        dispatch({
            type: FETCH_USER_PENDING
        });
        const res = await api.get(`/user/me${fromServer ? "?fromserver=true" : ""}`);
        dispatch({
            type: FETCH_USER_SUCCESS,
            payload: res.data
        });
    }catch(e){
        // console.error(e);
        dispatch(setAuthTokenInLocalStorage());
        dispatch(logout());
    }
}

export const createNewUser = (obj = {}) => async(dispatch, getState, api) => {
    try{
        dispatch({
            type: USER_LOGIN_PENDING
        });
        const res = await api.post('/user/signup',{
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
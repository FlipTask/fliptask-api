import {
    FETCH_ORGANIZATION_INFO_FAILURE,
    FETCH_ORGANIZATION_INFO_PENDING,
    FETCH_ORGANIZATION_INFO_SUCCESS
} from "./../constants/ActionTypes";
import {
    fetchUser
} from "./index";

export const fetchOrganization = () => async(dispatch, getState, api) => {
    try{
        dispatch({type: FETCH_ORGANIZATION_INFO_PENDING});
        const res = await api.get("/org/get");
        dispatch({
            type: FETCH_ORGANIZATION_INFO_SUCCESS,
            payload: res.data
        })
    }catch(e){
        console.error(e);
        dispatch({
            type: FETCH_ORGANIZATION_INFO_FAILURE,
            payload: e.response.data
        });
        return e.response.data
    } 
}

export const searchOrganization = (q) => async(dispatch, getState, api) => {
    try{
        const res = await api.get('/org/search',{
            params: {
                q
            }
        });
        return res.data;
    }catch(e){
        console.error(e);
        return e.response.data
    }
}


export const createNewOrganization = (name) => async(dispatch, getState, api) => {
    try{
        const res = await api.post('/org/create',{
            name
        });
        if(!res.data.error){
            await dispatch(fetchUser());
            await dispatch(fetchOrganization());
        }
        return res.data;
    }catch(e){
        console.error(e);
        return e.response.data
    }
}


export const sendInvitation = (mailList) => async(dispatch, getState, api) => {
    try{
        const res = await api.post('/onboard/invite',{
            mailList
        });
    }catch(e){
        console.log(e);
    }
}
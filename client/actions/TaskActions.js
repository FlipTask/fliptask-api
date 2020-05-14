import {
    NEW_TASK_FAILURE,
    NEW_TASK_PENDING,
    NEW_TASK_SUCCESS
} from "./../constants/ActionTypes";

export const createNewTask = (task) => async(dispatch, getState, api) => {
    try{
        dispatch({
            type: NEW_TASK_PENDING
        });
        const res = await api.post('/task/create',{
            ...task
        });
        dispatch({
            type: NEW_TASK_SUCCESS,
            payload: res.data
        });
        return res.data
    }catch(e){
        // console.log(e, e.message);
        dispatch({
            type: NEW_TASK_FAILURE,
            payload: e.message ? {message: e.message} : e.response.data
        });
        return false;
    }
}

export const updateTask = (task) => async(dispatch, getState, api) => {
    try{
        dispatch({
            type: NEW_TASK_PENDING
        });
        const res = await api.put('/task/update',{
            ...task
        });
        dispatch({
            type: NEW_TASK_SUCCESS,
            payload: res.data
        });
        return true
    }catch(e){
        // console.log(e, e.message);
        dispatch({
            type: NEW_TASK_FAILURE,
            payload: e.message ? {message: e.message} : e.response.data
        });
        return false;
    }
}

export const uploadTaskDescriptionImages = (images=[],taskId) => async(dispatch, getState, api) => {
    try{
        dispatch({
            type: NEW_TASK_PENDING
        });
        let formData = new FormData();
        for( let i = 0; i < images.length; i++ ){
            let file = images[i];
            formData.append('files', file);
        }
        const res = await api.post(`/task/upload/images?taskId=${taskId}`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: NEW_TASK_SUCCESS,
            payload: res.data
        });
        return res.data;
    }catch(e){
        console.log(e);
        dispatch({
            type: NEW_TASK_FAILURE,
            payload: e.message ? {message: e.message} : e.response.data
        });
        return e.message ? null : e.response.data
    }
}
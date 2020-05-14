import {
    FETCH_BOARDS_FAILURE,
    FETCH_BOARDS_PENDING,
    FETCH_BOARDS_SUCCESS,
    FETCH_TASKLIST_FAILURE,
    FETCH_TASKLIST_SUCCESS,
    FETCH_TASKLIST_PENDING,
    SWAP_TASK_CARD,
    SWAP_LIST_CARD_FAILURE,
    SWAP_LIST_CARD_PENDING,
    SWAP_LIST_CARD_SUCCESS,
    CREATE_TASKLIST_FAILURE,
    CREATE_TASKLIST_PENDING,
    CREATE_TASKLIST_SUCCESS,
    CHANGE_ACTIVE_BOARD_FAILURE,
    CHANGE_ACTIVE_BOARD_PENDING,
    CHANGE_ACTIVE_BOARD_SUCCESS,
    CREATE_BOARD_PENDING,
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAILURE
} from "./../constants/ActionTypes";

export const fetchBoards = () => async(dispatch, getState, api) => {
    try {
        dispatch({type: FETCH_BOARDS_PENDING})
        const res = await api.get('/board/get');
        await dispatch({
            type: FETCH_BOARDS_SUCCESS, 
            payload: res.data
        });
        /**
         *  fetching list for activeBoard
         */
        // const currState = getState();
        // if(currState.boards.activeBoard._id){
        //     dispatch(fetchTaskListsForBoard(currState.boards.activeBoard._id));
        // }
    } catch (e) {
        dispatch({
            type: FETCH_BOARDS_FAILURE,
            payload: e.message
                ? {
                    message: e.message
                }
                : e.response.data
        });
    }
}

export const fetchTaskListsForBoard = (boardId) => async(dispatch, getState, api) => {
    try {
        dispatch({type: FETCH_TASKLIST_PENDING});
        const res = await api.get(`/board/get/${boardId}`, {
            params: {
                extras: "tasks,task_list"
            }
        });
        dispatch({type: FETCH_TASKLIST_SUCCESS, payload: res.data});
    } catch (e) {
        console.log(e);
        dispatch({
            type: FETCH_TASKLIST_FAILURE,
            payload: e.message
                ? {
                    message: e.message
                }
                : e.response.data
        });
    }
}

export const swapTaskCard = ({from, to}) => async(dispatch) => {
    dispatch({
        type: SWAP_TASK_CARD,
        payload: {
            from,
            to
        }
    });
}

export const swapTaskList = (boardId,to = {}) => async(dispatch,getState,api) => {
    dispatch({
        type: SWAP_LIST_CARD_PENDING,
    });
    try{
        const res = await api.post(`/board/update/${boardId}`,{
            at_index: to.index,
            task_list_id: to.id
        });
        dispatch({
            type: SWAP_LIST_CARD_SUCCESS,
            payload: to,
        });
        if(!res.data.error){
            dispatch(fetchTaskListsForBoard(boardId))
        }
    }catch(e){
        console.log(e);
        dispatch({
            type: SWAP_LIST_CARD_FAILURE,
            payload: e.message ? {} : e.response.data,
        });
    }
}

export const createNewTaskList = (tasklist = {}) => async(dispatch, getState, api) => {
    dispatch({type: CREATE_TASKLIST_PENDING});
    try {
        const res = await api.post("/tasklist/create", {
            ...tasklist
        });
        dispatch({type: CREATE_TASKLIST_SUCCESS, payload: res.data});
        return true;
    } catch (e) {
        console.log(e);
        dispatch({
            type: CREATE_TASKLIST_FAILURE,
            payload: e.message
                ? {
                    message: e.message
                }
                : e.response.data
        });
        return false;
    }
}

export const changeActiveBoard = (boardId) => async(dispatch, getState, api) => {
    dispatch({
        type: CHANGE_ACTIVE_BOARD_PENDING
    });
    try{
        const res = await api.get(`/board/get/${boardId}?extras=task_list,tasks`);
        await dispatch({
            type: CHANGE_ACTIVE_BOARD_SUCCESS, 
            payload: res.data
        });
        // await dispatch(fetchTaskListsForBoard(boardId));
    }catch(e){
        console.log(e);
        dispatch({
            type: CHANGE_ACTIVE_BOARD_FAILURE,
            payload: e.message
                ? {
                    message: e.message
                }
                : e.response.data
        });
        return false;
    }
}

export const createNewBoard = (title) => async(dispatch, getState, api) => {
    try{
        dispatch({type: CREATE_BOARD_PENDING});
        const res = await api.post('/board/create',{
            title
        });
        dispatch({
            type: CREATE_BOARD_SUCCESS,
            payload: res.data
        });
        return res.data;
    }catch(e){
        dispatch({
            type: CREATE_BOARD_FAILURE,
            payload: e.response.data
        });
        return e.response.data
    }
}
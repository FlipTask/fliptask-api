import {
    FETCH_BOARDS_FAILURE,
    FETCH_BOARDS_PENDING,
    FETCH_BOARDS_SUCCESS,
    FETCH_TASKLIST_FAILURE,
    FETCH_TASKLIST_SUCCESS,
    FETCH_TASKLIST_PENDING,
    NEW_TASK_FAILURE,
    NEW_TASK_PENDING,
    NEW_TASK_SUCCESS,
    SWAP_TASK_CARD,
    SWAP_LIST_CARD_FAILURE,
    SWAP_LIST_CARD_PENDING,
    SWAP_LIST_CARD_SUCCESS,
    CREATE_TASKLIST_FAILURE,
    CREATE_TASKLIST_PENDING,
    CREATE_TASKLIST_SUCCESS,
    CHANGE_ACTIVE_BOARD_SUCCESS,
    CHANGE_ACTIVE_BOARD_FAILURE,
    CHANGE_ACTIVE_BOARD_PENDING,
    CREATE_BOARD_PENDING,
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAILURE
} from "./../constants/ActionTypes";


const INITIAL_STATE = {
    activeBoard: {
        task_list: []
    },
    boards:[],
    error:{},
    isLoading: false,
}

export default (state = INITIAL_STATE, {type,payload}) => {
    switch(type){
        case CREATE_BOARD_PENDING:
            return Object.assign({},state,{
                ...state,
                isLoading: true
            });
        case CREATE_BOARD_SUCCESS:
            return Object.assign({},state,{
                ...state,
                isLoading: false,
                activeBoard: payload.data,
                boards: [
                    ...state.boards,
                    payload.data
                ],
                error: {}
            });
        case CREATE_BOARD_FAILURE:
            return Object.assign({},state,{
                ...state,
                isLoading: false,
                error: payload.data
            });
        case FETCH_BOARDS_PENDING:
            return Object.assign({},state,{
                ...state,
                isLoading: true
            });
        case FETCH_BOARDS_SUCCESS:
            const boardData = payload.data
            return Object.assign({},state,{
                ...state,
                isLoading: false,
                boards: boardData,
                activeBoard: {
                    ...state.activeBoard,
                    ...boardData && boardData[0] || {}
                },
                error: {}
            });
        case FETCH_BOARDS_FAILURE:
            return Object.assign({},state, {
                ...state,
                isLoading: false,
                error: {
                    message: payload.message
                }
            });
        case FETCH_TASKLIST_SUCCESS:
            return Object.assign({},state,{
                ...state,
                activeBoard: {
                    ...state.activeBoard,
                    task_list: payload.data.task_list
                }
            });
        
        case CREATE_TASKLIST_SUCCESS:
            console.log("payload",payload);
            return Object.assign({},state,{
                ...state,
                activeBoard: {
                    ...state.activeBoard,
                    task_list: [
                        ...state.activeBoard.task_list,
                        payload.data
                    ]
                }
            });
        case NEW_TASK_SUCCESS:
            return Object.assign({},state,{
                ...state,
                activeBoard: {
                    ...state.activeBoard,
                    task_list: state.activeBoard.task_list.map((task_list) => {
                        if(task_list._id === payload.data.task_list){
                            return {
                                ...task_list,
                                tasks: task_list.tasks.filter(task => task._id === payload.data._id).length > 0 ? task_list.tasks.map((task) => {
                                    if(task._id === payload.data._id){
                                        return payload.data
                                    }
                                    return task
                                }) : [
                                    ...task_list.tasks,
                                    payload.data
                                ]
                            }
                        }else{
                            return task_list;
                        }
                    })
                }
            });
        case SWAP_LIST_CARD_SUCCESS:
            const listToSwap = state.activeBoard.task_list.filter(task => task._id === payload.id)[0];
            let toList = state.activeBoard.task_list.filter(task => task._id !== payload.id);
            return Object.assign({},state,{
                ...state,
                activeBoard: {
                    ...state.activeBoard,
                    task_list: [
                        ...toList.slice(0, payload.index),
                        listToSwap,
                        ...toList.slice(payload.index)
                    ]
                }
            });
            
        case SWAP_TASK_CARD:
            const {to,from} = payload;
            let taskToReplace = {};
            // finding task
            state.activeBoard.task_list.map((task_list) => {
                if(task_list._id === from.list_id){
                    return {
                        ...task_list,
                        tasks: task_list.tasks.map((task) => {
                            if(task._id === from.task_id){
                                taskToReplace = task;
                            }
                            return task;
                        })
                    }
                }
                return task_list;
            });
            // remove task from list;
            const fromList = state.activeBoard.task_list.map((task_list) => {
                if(task_list._id === from.list_id){
                    return {
                        ...task_list,
                        tasks: task_list.tasks.filter(task => task._id !== from.task_id)
                    }
                }
                return task_list;
            });
            
            // add task into list at provided index:
            const updatedList = fromList.map((task_list) => {
                if(task_list._id === to.list_id){
                    return {
                        ...task_list,
                        tasks: [
                            ...task_list.tasks.slice(0, to.index),
                            taskToReplace,
                            ...task_list.tasks.slice(to.index)
                        ]
                    }
                }
                return task_list;
            });
            return Object.assign({},state,{
                ...state,
                activeBoard: {
                    ...state.activeBoard,
                    task_list: updatedList
                }
            });
            
        case CHANGE_ACTIVE_BOARD_SUCCESS:
            return Object.assign({},state,{
                ...state,
                activeBoard: payload.data
            });
        default:
            return state;
    }
}
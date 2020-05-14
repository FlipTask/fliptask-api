import {
    FETCH_ORGANIZATION_INFO_FAILURE,
    FETCH_ORGANIZATION_INFO_PENDING,
    FETCH_ORGANIZATION_INFO_SUCCESS
} from "./../constants/ActionTypes";

const INITIAL_STATE = {
    info: {},
    isLoading: false,
    error: {}
};

export default (state = INITIAL_STATE, {type,payload}) => {
    switch(type){
        case FETCH_ORGANIZATION_INFO_SUCCESS:
            return Object.assign({},state,{
                ...state,
                isLoading: false,
                error: {},
                info: payload.data
            });
        case FETCH_ORGANIZATION_INFO_PENDING:
            return Object.assign({},state,{
                ...state,
                isLoading: true,
            });
        case FETCH_ORGANIZATION_INFO_FAILURE:
            return Object.assign({},state,{
                ...state,
                isLoading: false,
                error: payload.data
            });
        default:
            return state;
    }
}
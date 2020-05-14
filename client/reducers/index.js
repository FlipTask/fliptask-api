import {combineReducers} from 'redux';
import UserReducer from "./UserReducer";
import BoardReducer from "./BoardReducer";
import OrganizationReducer from "./OrganizationReducer";

export default combineReducers({
    user: UserReducer,
    boards: BoardReducer,
    org: OrganizationReducer
});
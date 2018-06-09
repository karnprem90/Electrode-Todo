import {combineReducers} from "redux";
import {routerReducer} from 'react-router-redux'
import * as types from '../cnstants';
import * as Auth from '../utils/auth';
const initialCommonState = {
    isSignedUp:false,
    isLoggedIn : false,
    list: [],
    editData : '',
    id:'',
    searchData: [],
    addToDo:false,
    editToDo:false,
    updateToDo:false,
    signInErrorMsg: '',
    signUpErrorMsg: '',
    updateToDoErrMsg : '',
    editToDoErrMsg: '',
    addToDoErrMsg : ''
};

const toDo = (store=initialCommonState, action) => {
    switch (action.type) {
        case types.ADD_TODO + "_FULFILLED":
            store = {
                ...store,
                addToDo: true
            }
            break;

        case  types.ADD_TODO + "_PENDING":
            break;

        case types.ADD_TODO + "_REJECTED":
            store = {
                ...store,
                addToDoErrMsg: action.payload,
                addToDo: false
            }
            break;

        case types.LIST_TODO + "_FULFILLED":
            const list = action.payload.todos;
            store = {
                ...store,
                data:list
            }
            break;

        case  types.LIST_TODO + "_PENDING":
            break;

        case types.LIST_TODO + "_REJECTED":
            break;
        case types.EDIT_TODO + "_FULFILLED":
            if(action.payload.status === 200) {
                const editData = action.payload.todo;
                console.log('edit_to_do');
                store = {
                    ...store,
                    editData:editData
                }
            } else {

            }

            break;

        case  types.EDIT_TODO + "_PENDING":
            break;

        case types.EDIT_TODO + "_REJECTED":
            store = {
                ...store,
                editToDo: false,
                editToDoErrMsg: action.payload
            }
            break;
        case 'GET_ID':
            store = {
                ...store,
                id: action.payload
            }
            break;
        case  types.UPDATE_TODO + "_PENDING":
            break;

        case types.UPDATE_TODO + "_REJECTED":
            store = {
                ...store,
                updateToDo: false,
                updateToDoErrMsg: action.payload
            }
            break;

        case types.UPDATE_TODO + "_FULFILLED":
            //const list = action.payload.todo[0];
            store = {
                ...store
            }
            break;
        case types.SEARCH_TODO + "_FULFILLED":
            const searchedData = action.payload.todo;
            store = {
                ...store,
                data: searchedData
            };

            break;

        case  types.SEARCH_TODO + "_PENDING":
            break;

        case types.SEARCH_TODO + "_REJECTED":
            break;

    }

    return store;
};

const loginSignUp = (store=initialCommonState, action) => {
    switch (action.type) {
        case types.LOCAL_SIGNUP + "_FULFILLED":
            Auth.default.authenticateUser(action.payload.token);
            if (action.payload.status === 200) {
                store = {
                    ...store,
                    isSignedUp:true
                }
            }
            break;

        case  types.LOCAL_SIGNUP + "_PENDING":
            break;

        case types.LOCAL_SIGNUP + "_REJECTED":
            store = {
                ...store,
                signUpErrorMsg: action.payload,
                isSignedUp:false
            }
            break;

        case types.LOCAL_SIGNIN + "_FULFILLED":

            if (action.payload.status === 200) {
                const token = action.payload.tokens;
                if(token){
                    Auth.default.authenticateUser(token[0].token);
                }
                store = {
                    ...store,
                    isLoggedIn:true
                }
            }
            break;

        case  types.LOCAL_SIGNIN + "_PENDING":
            store = {
                ...store,
                signInErrorMsg: action.payload,
                isLoggedIn:false
            }
            break;

        case types.LOCAL_SIGNIN + "_REJECTED":
            break;
    }

    return store;
};



export default combineReducers({
    toDo,
    loginSignUp,
    routing:routerReducer
});

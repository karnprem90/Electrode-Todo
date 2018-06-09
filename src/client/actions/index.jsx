import * as api from '../utils/api';
import * as types from '../cnstants';
import { Auth }  from  '../utils/auth';

export const addToDo = (info) => {
  return {
      type: types.ADD_TODO,
      payload: api.default.addToDo( info )
          .then( (response) => {
              response.data.status = response.status;
              return response.data;
          } )
  };
};

export const editToDo = (id) => {
    return {
        type: types.EDIT_TODO,
        payload: api.default.editTodo(id)
            .then( (response) => {
                response.data.status = response.status;
                return response.data;
            } )
    };
};

export const updateToDo = (info, id) => {
    return {
        type: types.UPDATE_TODO,
        payload: api.default.updateToDo( info, id)
            .then( (response) => {
                response.data.status = response.status;
                return response.data;
            } )
    };
};
export const listToDo = () => {
  return {
      type: types.LIST_TODO,
      payload: api.default.listToDo()
          .then( (response) => {
              response.data.status = response.status;
              return response.data;
          } )
  };
};

export const deleteToDo = (info, id) => {
  return  {
      type: types.DELETE_TODO,
      payload: api.default.deleteToDo( info, id)
          .then( (response) => {
              response.data.status = response.status;
              return response.data;
          } )
  };
};

export const signUp = (credential) => {
    return  {
        type: types.LOCAL_SIGNUP,
        payload: api.default.localSignup( credential )
            .then( (response) => {
                response.data.status = response.status;
                return response.data;
            } )
    };
};

export const login = (credential) => {
    return  {
        type: types.LOCAL_SIGNIN,
        payload: api.default.login( credential )
            .then( (response) => {
                Auth.authenticateUser(response.headers['x-auth']);
                response.data.status = response.status;
                return response.data;
            } )
    };
};

export const search = (text) => {
    return  {
        type: types.SEARCH_TODO,
        payload: api.default.searchToDo( text )
            .then( (response) => {
                response.data.status = response.status;
                return response.data;
            } )
    };
};
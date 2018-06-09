import axios from 'axios';
const API_URL = 'http://localhost:3000';
import Auth from './auth.js';


/**
 * @param
 *
 * @calls action on success or failure
 */
const utils = {

    login: (credential) => {
        let url = `${API_URL}/users/login`;
        return axios.post(url, credential);
    },
    localSignup: (userDetail) => {
        let url = `${API_URL}/users`;
        return axios.post(url, userDetail);
    },

    addToDo: (info) => {
        let url = `${API_URL}/todos`;
        return axios.post(url, info,{
            headers: { 'x-auth': Auth.getToken()}});
    },
    editTodo: (id) => {
        let url = `${API_URL}/todos/${id}`;
        return axios.get(url, {
            headers: { 'x-auth': Auth.getToken()}});
    },
    updateToDo: (info, id) => {
        let url = `${API_URL}/todos/${id}`;
        return axios.patch(url, info, {
            headers: { 'x-auth': Auth.getToken()}});
    },

    listToDo: () => {
        console.log('tokenAsHeader',);
        let url = `${API_URL}/todos`;
        return axios.get(url, {
            headers: { 'x-auth': Auth.getToken()}});
    },
    deleteToDo: (info, id) => {
        let url = `${API_URL}/todos/${id}`;
        return axios.delete(url, {
            headers: { 'x-auth': Auth.getToken()}});
    },
    searchToDo: (text) => {
        let url = `${API_URL}/search/${text}`;
        console.log('url', url)
        return axios.get(url, {
            headers: { 'x-auth': Auth.getToken()}});
    }
};

export default utils;

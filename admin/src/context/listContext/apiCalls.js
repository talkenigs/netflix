import axios from 'axios';
import { createListsFailure, createListsStart, createListsSuccess, deleteListsFailure, deleteListsStart, deleteListsSuccess, getListsFailure, getListsStart, getListsSuccess } from './ListActions';

export const getLists = async (dispatch) => {
    dispatch(getListsStart());

    try {
        const res = await axios.get('/lists', {
            headers: {
                token:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(getListsSuccess(res.data));
    } catch (err) {
        dispatch(getListsFailure());
    }
};

export const deleteList = async (id, dispatch) => {
    dispatch(deleteListsStart());

    try {
        const res = await axios.delete('/movies/' + id, {
            headers: {
                token:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(deleteListsSuccess(id));
    } catch (err) {
        dispatch(deleteListsFailure());
    }
};

export const createList = async (list, dispatch) => {
    dispatch(createListsStart());
    try {
        const res = await axios.post('/lists', list, {
            headers: {
                token:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(createListsSuccess(res.data));
    } catch (err) {
        dispatch(createListsFailure());
    }
};

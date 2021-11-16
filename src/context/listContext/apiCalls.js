import axios from "axios"
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess } from "./MoviesListActions";


export const getLists = async (dispatch) => {
    dispatch(getListsStart())
    try {
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
        const res = await axios.get(`http://localhost:5000/api/lists/`, {
            headers: {
                authorization: "Bearer " + token
            }
        })
        dispatch(getListsSuccess(res.data))        
    } catch (error) {
        dispatch(getListsFailure())
    }
}

export const createList = async (list, dispatch) => {
    dispatch(createListStart())
    try {
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
        const res = await axios.post(`http://localhost:5000/api/lists/`, list, {
            headers: {
                authorization: "Bearer " + token
            }
        })
        dispatch(createListSuccess(res.data))        
    } catch (error) {
        dispatch(createListFailure())
    }
}

export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart())
    try {
        await axios.delete(`http://localhost:5000/api/lists/` + id, {
            headers: {
                authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteListSuccess(id))        
    } catch (error) {
        dispatch(deleteListFailure())
    }
}
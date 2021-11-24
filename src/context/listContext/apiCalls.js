import axios from "axios"
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess } from "./MoviesListActions";


export const getLists = async (dispatch) => {
    dispatch(getListsStart())
    try {
        const res = await axios.get(`http://localhost:5000/api/lists/`)
        dispatch(getListsSuccess(res.data))        
    } catch (error) {
        dispatch(getListsFailure())
    }
}

export const createList = async (list, dispatch) => {
    dispatch(createListStart())
    try {
        const res = await axios.post(`http://localhost:5000/api/lists/`, list)
        dispatch(createListSuccess(res.data))        
    } catch (error) {
        dispatch(createListFailure())
    }
}

export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart())
    try {
        await axios.delete(`http://localhost:5000/api/lists/` + id)
        dispatch(deleteListSuccess(id))        
    } catch (error) {
        dispatch(deleteListFailure())
    }
}
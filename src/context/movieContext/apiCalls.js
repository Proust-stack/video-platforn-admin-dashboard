import axios from "axios"
import { createMoviesFailure, createMoviesStart, deleteMoviesFailure, deleteMoviesStart, deleteMoviesSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieActions"


export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart())
    try {
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
        const res = await axios.get(`http://localhost:5000/api/movies/`, {
            headers: {
                authorization: "Bearer " + token
            }
        })
        dispatch(getMoviesSuccess(res.data))        
    } catch (error) {
        dispatch(getMoviesFailure())
    }
}
export const createMovie = async (movie, dispatch) => {
    dispatch(createMoviesStart())
    try {
        const token = JSON.parse(localStorage.getItem("user")).accessToken;
        const res = await axios.post(`http://localhost:5000/api/movies/`, movie, {
            headers: {
                authorization: "Bearer " + token
            }
        })
        dispatch(getMoviesSuccess(res.data))        
    } catch (error) {
        dispatch(createMoviesFailure())
    }
}
export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMoviesStart())
    try {
        await axios.delete(`http://localhost:5000/api/movies/` + id, {
            headers: {
                authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken
            }
        })
        dispatch(deleteMoviesSuccess(id))        
    } catch (error) {
        dispatch(deleteMoviesFailure())
    }
}
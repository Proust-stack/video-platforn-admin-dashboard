import { createContext, useReducer } from "react"
import MovieReducer from "./MovieReducer"

const initialState =  {
    movies: [],
    isFetching: false,
    error: false    
}

export const MoviesContext = createContext(initialState)
export const MoviesContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(MovieReducer, initialState)    
    return (
        <MoviesContext.Provider 
        value={{
            movies: state.movies, 
            isFetching: state.isFetching, 
            error: state.error,
            dispatch
        }}>
            {children}
        </MoviesContext.Provider>
    )
}
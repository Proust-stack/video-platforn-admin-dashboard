import { createContext, useReducer } from "react"
import MoviesListReducer from "./MoviesListReducer"

const initialState =  {
    lists: [],
    isFetching: false,
    error: false    
}

export const MoviesListContext = createContext(initialState)
export const MoviesListContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(MoviesListReducer, initialState)    
    return (
        <MoviesListContext.Provider 
        value={{
            lists: state.lists, 
            isFetching: state.isFetching, 
            error: state.error,
            dispatch
        }}>
            {children}
        </MoviesListContext.Provider>
    )
}
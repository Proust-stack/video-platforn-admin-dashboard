const MoviesReducer = (state, action) => {
    switch (action.type) {
        case "MOVIES_START":
            return {
                movies: [],
                isFetching: true,
                error: false    
            }
        case "MOVIES_SUCCESS":
            return {
                movies: action.payload,
                isFetching: false,
                error: false    
            }
        case "MOVIES_FAILURE":
            return {
                movies: [],
                isFetching: false,
                error: true    
            }

        case "CREATE_MOVIE_START":
            return {
                ...state,
                isFetching: true,
                error: false    
            }
        case "CREATE_MOVIE_SUCCESS":
            return {
                movies: [...state.movies, action.payload],
                isFetching: false,
                error: false    
            }
        case "CREATE_MOVIE_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true    
            }

        case "UPDATE_MOVIE_START":
            return {
                ...state,
                isFetching: true,
                error: false    
            }
        case "UPDATE_MOVIE_SUCCESS":
            const movieToUplod = state.movies.map(movie => movie.id === action.payload.id ? action.payload : movie)
            return {
                movies: movieToUplod,
                isFetching: false,
                error: false    
            }
        case "UPDATE_MOVIE_FAILURE":    
            return {
                ...state,
                isFetching: false,
                error: true    
            }


        case "DELETE_MOVIES_START":
            return {
                ...state,
                isFetching: true,
                error: false    
            }
        case "DELETE_MOVIES_SUCCESS":
            const deletedMovie = state.movies.filter(movie => movie._id !== action.payload)
            return {
                movies: deletedMovie,
                isFetching: false,
                error: false    
            }
        case "DELETE_MOVIES_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true    
            }
        default:
            return state;
    }
}

export default MoviesReducer
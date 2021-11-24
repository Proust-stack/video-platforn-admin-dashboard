import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { MoviesListContextProvider } from './context/listContext/MoviesListContext';
import { MoviesContextProvider } from './context/movieContext/MovieContext';


ReactDOM.render(
    <AuthContextProvider>
      <MoviesContextProvider>
        <MoviesListContextProvider>
          <App />
        </MoviesListContextProvider>
      </MoviesContextProvider>
    </AuthContextProvider>,
  document.getElementById('root')
);

import { useState, useContext, useEffect } from "react";
import { MoviesListContext } from "../../context/listContext/MoviesListContext";
import { MoviesContext } from "../../context/movieContext/MovieContext";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import storage from "../../firebase.js"
import "./newList.css";
import { createList } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState(null)
  const history = useHistory()

  const { dispatch } = useContext( MoviesListContext )
  const { movies, dispatch: dispatchMovie } = useContext( MoviesContext )

  useEffect(() => {
    getMovies(dispatchMovie)
  }, [dispatchMovie])

  const handleChange = (e) => {
  const value = e.target.value;
  setList({...list, [e.target.name]: value})
    }
  const handleSelect = (e) => {
  let content = Array.from(e.target.selectedOptions, (option) => option.value)
  setList({...list, [e.target.name]: content})
    }

const handleSubmit = (e) => {
  e.preventDefault()
  createList(list, dispatch)
  history.push("/lists")
  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New list</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder="title of list"  name="title" onChange={handleChange}/>
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input type="text" placeholder="genre"  name="genre"  onChange={handleChange}/>
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option disabled>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select multiple name="content" onChange={handleSelect} style={{height: 280}}>
              {movies.map(movie => 
                  <option value={movie._id} key={movie._id}>{movie.title}</option>
                )}
              <option value="movie">Movie</option>
            </select>
          </div>
        </div>
      <button className="addProductButton" onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}

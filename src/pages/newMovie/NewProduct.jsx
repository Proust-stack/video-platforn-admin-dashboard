import { useState, useContext } from "react";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MoviesContext } from "../../context/movieContext/MovieContext";
import storage from "../../firebase.js"
import "./newProduct.css";
import Button from '@material-ui/core/Button';
import Snack from "../../components/Snack";

export default function NewProduct() {
  const [movie, setMovie] = useState(null)
  const [img, setImg] = useState(null)
  const [imgTitle, setImgTitle] = useState(null)
  const [imgSm, setImgSm] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [video, setVideo] = useState(null)
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [uploaded, setUploaded] = useState(0)
  const [progress, setProgress] = useState('0')

  const { dispatch } = useContext( MoviesContext )


  const fieldsOfMovie = [
    {file: img, label: "img"},
    {file: imgTitle, label: "imgTitle"},
    {file: imgSm, label: "imgSm"},
    {file: trailer, label: "trailer"},
    {file: video, label: "video"},
  ]

  const handleChange = (e) => {
  const value = e.target.value;
  setMovie({...movie, [e.target.name]: value})
}
 

const upload = (items) => {
  items.forEach(item => {
    const fileName = new Date().getTime() + item.label + item.file.name
    const uploadTask = storage.ref(`/items/${fileName}`).put(item.file) 
    uploadTask.on(
      "state_changed", 
      (snapshot) => {
        setProgress(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '% done');
    },
    (err) => {
      console.log(err)
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        setMovie((prev) => {
          return {...prev, [item.label]: url}
        })
        setUploaded(prev => prev + 1)
      })
    }
    )
  })
}

const handleFirebase =  (e) => {
  e.preventDefault()
  upload(fieldsOfMovie)
  if (uploaded === 5) {
    setMessage('uploaded to firebase, then send to database')
    setIsSnackOpen(true)
  }
}
const handleMongoBase =  (e) => {
  e.preventDefault()
  createMovie(movie, dispatch)
  setMessage('The movie has sent to database')
  setIsSnackOpen(true)
  setUploaded(0)
}
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img"  name="img" onChange={e => setImg(e.target.files[0])}/>
          <div>{progress}</div>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" id="trailer"  name="trailer"  onChange={e => setTrailer(e.target.files[0])}/>
          <div>{progress}</div>
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" id="video"  name="video"  onChange={e => setVideo(e.target.files[0])}/>
          <div>{progress}</div>
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle" name="imgTitle"  onChange={e => setImgTitle(e.target.files[0])}/>
          <div>{progress}</div>
        </div>
        <div className="addProductItem">
          <label>Thumbnail</label>
          <input type="file" id="imgSm"  name="imgSm" onChange={e => setImgSm(e.target.files[0])}/>
          <div>{progress}</div>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="John Wick"  name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Description"  name="desc"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="Year"  name="year"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Genre"  name="genre"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="Limit" name="limit"  onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>is series ?</label>
          <select name="isSeries" id="isSeries"  onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <Button  
        variant="contained" 
        color="primary" 
        className="addProductButton" 
        onClick={handleFirebase}
        disabled={!!uploaded}
        >Upload to storage
        </Button>
        {uploaded === 5 && 
          <Button  
          variant="contained" 
          color="primary" 
          className="addProductButton" 
          onClick={handleMongoBase}
          >Send to database</Button>
        }
      </form>
      <Snack isOpen={isSnackOpen} handleClose={() => setIsSnackOpen(false)} message={message}/>
    </div>
  );
}

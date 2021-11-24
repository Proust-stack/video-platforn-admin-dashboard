import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Movies from "./pages/movies/Movies";
import Product from "./pages/movie/Product";
import NewList from "./pages/newList/NewList.jsx";
import Login from "./pages/login/Login";
import { useContext } from 'react';
import { AuthContext } from "./context/authContext/AuthContext";
import MoviesList from "./pages/moviesList/MoviesList";
import List from "./pages/list/List";
import NewProduct from "./pages/newMovie/NewProduct";

function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
       <Switch>
      <Route exact path="/login">{ user ? <Redirect to="/"/> : <Login /> }</Route>
      { user && (
        <>
        <Topbar />
        <div className="container">
          <Sidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>
            <Route path="/lists">
              <MoviesList />
            </Route>
            <Route path="/list/:listId">
              <List />
            </Route>
            <Route path="/newList">
              <NewList />
            </Route>
        </div>
      </>
      )}
      </Switch>
    </Router>
  );
}

export default App;

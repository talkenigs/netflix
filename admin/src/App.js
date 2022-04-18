import './app.css';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import Movie from './pages/movie/Movie';
import NewMovie from './pages/newMovie/NewMovie';
import MovieList from './pages/movieList/MovieList';
import Login from './pages/login/Login';
import ListList from './pages/listList/ListList';
import List from './pages/list/List';
import NewList from './pages/newList/NewList';
import { useContext } from 'react';
import { AuthContext } from './context/authContext/AuthContext';

function App() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                ></Route>
            </Routes>
            {user ? (
                <>
                    <Topbar />
                    <div className="container">
                        <Sidebar />
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/users" element={<UserList />}></Route>
                            <Route
                                path="/user/:userId"
                                element={<User />}
                            ></Route>
                            <Route
                                path="/newUser/"
                                element={<NewUser />}
                            ></Route>
                            <Route
                                path="/movies"
                                element={<MovieList />}
                            ></Route>
                            <Route
                                path="/movie/:movieId"
                                element={<Movie />}
                            ></Route>
                            <Route
                                path="/newMovie"
                                element={<NewMovie />}
                            ></Route>
                            <Route path="/lists" element={<ListList />}></Route>
                            <Route
                                path="/list/:listId"
                                element={<List />}
                            ></Route>
                            <Route
                                path="/newList"
                                element={<NewList />}
                            ></Route>
                        </Routes>
                    </div>
                </>
            ) : (
                <Login />
            )}
        </Router>
    );
}

export default App;

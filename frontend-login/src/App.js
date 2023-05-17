import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Post from './components/Post';
import EditPost from './components/EditPost';
import AddPost from './components/AddPost';





function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            CRUD
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/posts">
                  Post
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        

        <div className="container my-2">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/posts" element={<Post />} />
            <Route path="/editpost/:id" element={<EditPost />} />
            <Route path="/addpost" element={<AddPost />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

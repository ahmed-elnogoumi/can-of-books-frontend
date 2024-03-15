import React from 'react';
import { useState, useEffect } from 'react';

import About from './About';
import BestBooks from './BestBooks';

import Header from './Header';
import Footer from './Footer';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthButtons from './auth/AuthButtons.jsx';
import {useAuth0} from '@auth0/auth0-react';

import Profile from './Profile.jsx';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import BookFormModal from './BookFormModal';

function App() {

  const [show, setShow] = useState(false);
  const [moviesData, setMoviesData] = useState([])
  const [bookId, setBookId] = useState(null);

  let {isLoading, isAuthenticated} = useAuth0();

  useEffect(() => {
    console.log('LOADING FROM AUTH0', isLoading);
  });

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setBookId(id);
  }

  return (
    <>
      <BookFormModal bookId={bookId} handleClose={handleClose} show={show} />

      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={!isAuthenticated ? <p>Welcome! Please Log in!</p> : <BestBooks movies={moviesData} setMovies={setMoviesData} handleShow={handleShow} />} />
          <Route exact path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </Router>
        <AuthButtons />
      <Footer />
    </>
  );
}

export default App;

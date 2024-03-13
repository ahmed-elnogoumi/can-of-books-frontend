import React from 'react';
import { useState } from 'react';

import About from './About';
import BestBooks from './BestBooks';

import Header from './Header';
import Footer from './Footer';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import BookFormModal from './BookFormModal';

function App() {
  const [show, setShow] = useState(false);
  const [moviesData, setMoviesData] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <BookFormModal handleClose={handleClose} show={show} />

      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<BestBooks movies={moviesData} setMovies={setMoviesData} handleShow={handleShow} />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;

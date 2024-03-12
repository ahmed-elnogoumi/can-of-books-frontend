import React from 'react';
import { useState } from 'react';

import About from './About';
import BestBooks from './BestBooks';
import BookForm from './BookForm';
import Header from './Header';
import Footer from './Footer';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<BestBooks />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>

      <Button variant="primary" onClick={handleShow}>
        Open Form
      </Button>
    </>
  );
}

export default App;

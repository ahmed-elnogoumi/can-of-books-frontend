import React from 'react';
import {useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react'
import {Link} from 'react-router-dom';


const SERVER_URL = import.meta.env.VITE_SERVER_URL;


function BestBooks(props)  {
  const [data, setData] = useState([])

  let {getIdTokenClaims, isAuthenticated, User} = useAuth0();

  const fetchToken = async () => {
    let response = await getIdTokenClaims();
    return response.__raw;
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchToken() 
        .then(token => {
          axios.get(`${SERVER_URL}/books`, { headers: {"Authorization": `Bearer ${token}`}})
            .then(response => {
              console.log(response.data);
              props.setMovies(response.data);
            })
            .catch(error => console.error('There was an error!', error));
        })
    }

    
  }, [isAuthenticated]); // Empty array means this effect runs once after the initial render



  const handleDelete = async (id) => {
    let token = await fetchToken();
    let headers = {
      'Authorization': `Bearer ${token}`
    }

    await axios.delete(`${SERVER_URL}/books/${id}`, { headers });

  }

  return (
    <div>
      <h3>Our Books:</h3>
      <Carousel style={{textAlign: 'center', height: '250px', backgroundColor: 'gray', paddingTop: '25px'}}>
      {
      props.movies.length > 0 
      ?
        props.movies.map((book, idx) => (
          <Carousel.Item key={idx}>
          <div>
            <p>
              {book.title}
            </p>
            <p>
              {book.description}
            </p>
            <p>
              {book.status ? 'Read' : 'Unread'}
            </p>
            <Button onClick={() => props.handleShow(book._id)}>Update</Button>
            <Button onClick={() => handleDelete(book._id)}>Delete</Button>
          </div>
          </Carousel.Item>
        ))
      :
      <p>No results found</p>
      }
    </Carousel>
    <Button style={{margin: '30px'}} variant="primary" onClick={() => props.handleShow()}>
        Add New Book
    </Button>
    </div>
  );
}

export default BestBooks;

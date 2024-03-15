import React from 'react';
import {useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import {Link} from 'react-router-dom';


const SERVER_URL = import.meta.env.VITE_SERVER_URL;


function BestBooks(props)  {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(`${SERVER_URL}/books`)
      .then(response => {
        console.log(response.data);
        props.setMovies(response.data);
      })
      .catch(error => console.error('There was an error!', error));
  }, []); // Empty array means this effect runs once after the initial render

  let {getIdTokenClaims, isAuthenticated, user} = useAuth0();

  const fetchToken = async () => {
    let response = await getIdTokenClaims();
    return response.__raw;
  }

  useEffect(() => {
    console.log("this will run before my app render");
    if (isAuthenticated) {
      console.log('THIS IS THE CURRENT USER', user);
      // you can set state here! without triggering an infinite re-render.
      fetchToken()
        .then(token => {
          console.log('TOKEN FROM AUTH0', token);
          axios.get(SERVER_URL + '/books', { headers: { "Authorization": `Bearer ${token}` }})
            .then(response => setBooks(response.data));
        });
    } else {
      console.log('User not authenticated');
    }
  }, [isAuthenticated]);


  const handleDelete = async (id) => {

    await axios.delete(`${SERVER_URL}/books/${id}`);

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

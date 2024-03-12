import React from 'react';
import {useState, useEffect} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import {Link} from 'react-router-dom';

function BestBooks()  {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/books')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => console.error('There was an error!', error));
  }, []); // Empty array means this effect runs once after the initial render

  return (
    <div>
      <h1>Data from API:</h1>
      <Carousel>
      {
      data.length > 0 
      ?
        data.map((book, idx) => (
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
          </div>
          </Carousel.Item>
        ))
      :
      <p>No results found</p>
      }
    </Carousel>
    </div>
  );
}

export default BestBooks;

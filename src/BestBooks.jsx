import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

function BestBooks()  {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('https://localhost:3001/books')
      .then(response => {
        console.log(response);
        setData(response.data);
      })
      .catch(error => console.error('There was an error!', error));
  }, []); // Empty array means this effect runs once after the initial render

  return (
    <div>
      <h1>Data from API:</h1>
      <p>{data}</p>
    </div>
  );

//   render() {

//     /* TODO: render all the books in a Carousel */

//     return (
//       <>
//         <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

//         {this.state.books.length ? (
//           <p>Book Carousel coming soon</p>
//         ) : (
//           <h3>No Books Found :(</h3>
//         )}
//       </>
//     )
//   }
}

export default BestBooks;

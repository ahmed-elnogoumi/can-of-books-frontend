import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


import axios from 'axios';

const SERVER_URL = import.meta.env.DATABASE_URL;

function BookForm() {
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [status, setStatus] = useState(false);
    let [error, setError] = useState(null);
    const statusOptions = [
      { name: 'Read', value: true },
      { name: 'Unread', value: false }, 
    ];

    const createBook = async (values) => {
      let response = await axios.post('http://localhost:3001/books', values);
      console.log(response.data);
    }

    const handleInput = (e) =>  {
      let { name, value } = e.target;

      switch(name) {
        case 'title':
          setTitle(value);
          break;
        case 'description':
          setDescription(value);
          break
        case 'status':
          setStatus(value);
          break;
        default:
          setError('Invalid input value');
      }
    }

    const handleSubmit= (e) => {
        try {
          e.preventDefault();
          createBook({ title, description, status });
        } catch (e) {
          setError('Error sending request :(');
        }
    }

      return (
        <Form onSubmit={handleSubmit} style={{width:'60vw', margin:'auto'}}>
          <h2>Enter your favorite book!</h2>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Book Title</Form.Label>
            <Form.Control onChange={handleInput} name="title" id="title" placeholder="Words of Radience" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Book Description</Form.Label>
            <Form.Control onChange={handleInput} name="description" id="description" placeholder="A book about people using storm energy for power." />
          </Form.Group>
          {/*This looks bad. It works, supposedly.*/}
          <ButtonGroup>
            {statusOptions.map((option, idx) => (
                <ToggleButton
                        key={idx}
                        id={`status-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                        name="status"
                        value={option.value}
                        checked={status === option.value}
                        onChange={(e) => setStatus(e.currentTarget.value === 'true')}
                >
                        {option.name}
                </ToggleButton>
            ))}
            </ButtonGroup>
          <Button type="submit">Submit</Button>
        </Form>
      )
    }

  export default BookForm;
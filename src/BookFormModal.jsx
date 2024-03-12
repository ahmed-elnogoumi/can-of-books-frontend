
import Modal from 'react-bootstrap/Modal';
import BookForm from './BookForm';
import Button from 'react-bootstrap/Button';

function BookFormModal(props) {
    <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
        <Modal.Title>Book Form</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <BookForm />
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
        Close
        </Button>
    </Modal.Footer>
    </Modal>
}

export default BookFormModal;

import Modal from 'react-bootstrap/Modal';
import BookForm from './BookForm';
import Button from 'react-bootstrap/Button';

function BookFormModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> {props.bookId ? 'Update' : 'Add'} your Book! </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BookForm handleClose={props.handleClose} bookId={props.bookId}/>
            </Modal.Body>
        </Modal>
    )
}

export default BookFormModal;
import React from 'react'
import { Modal, Button} from 'react-bootstrap'

const PopUp = ({ show, onHide }) => {

    console.log('popup page')
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Товар добавлен в корзину
          </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PopUp;
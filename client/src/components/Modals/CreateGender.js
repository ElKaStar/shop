import React, {useState} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createGender } from '../../http/productAPI'

const CreateGender = ({ show, onHide }) => {

    const [value, setValue] = useState('')
    const addGender = () => {
        createGender({ name: value }).then(data => setValue(''))
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый вид
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={"Введите наименование нового вида"}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addGender}>Сохранить</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateGender;
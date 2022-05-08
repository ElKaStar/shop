import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createProperty } from '../../http/productAPI'

const CreateProperty = ({ show, onHide }) => {

    const [value, setValue] = useState('')
    const addProperty = () => {
        createProperty({name: value}).then(data => setValue(''))
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
                    Добавить новый тип
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите наименование нового свойства товара"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addProperty}>Сохранить</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateProperty;
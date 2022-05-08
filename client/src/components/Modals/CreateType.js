import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createType } from '../../http/productAPI'

const CreateType = ({ show, onHide }) => {

    const [value, setValue] = useState('')
    const addType = () => {
        createType({name: value}).then(data => setValue(''))
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
                        placeholder={"Введите наименование нового типа"}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addType}>Сохранить</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateType;
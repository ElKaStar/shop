import React, {useState} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createCatalog } from '../../http/productAPI'

const CreateCatalog = ({ show, onHide }) => {

    const [value, setValue] = useState('')
    const [image, setImage] = useState('')

    const addCatalog = () => {
        createCatalog({ name: value, scr: image }).then(data => {
            setValue('')
            setImage('')
        })
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
                    Добавить новый каталог
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={"Введите наименование каталога"}
                    />
                    <Form.Control
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder={"Введите путь к фото на облаке"}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addCatalog}>Сохранить</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateCatalog;
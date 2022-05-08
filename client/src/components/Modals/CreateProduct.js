import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap'
import { fetchProperties, fetchTypes, fetchGenders, createProperty, fetchCatalogs, createCatalogsInfo } from '../../http/productAPI'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import {createProduct, uploadImage, uploadProductInfo} from '../../http/productAPI'

const CreateProduct = observer(({ show, onHide }) => {

    const { product } = useContext(Context)
    const [info, setInfo] = useState([])
    const [images, setImages] = useState([])

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    


    const addInfo = () => {
        setInfo([...info, { title: "", description: "", id: "", number: Date.now() }])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const removeImage = (number) => {
        setImages(images.filter(i => i.number !== number))
    }

    const addImage = () => {
        setImages([...images, { src: '', number: Date.now() }])
    }

    const selectFile = (e, number) => {
        const newFiles = [...images]
        newFiles.map((item) => {
            if (item.number === number) {
                item.src = e.target.files[0]
            }
            return item
        })
    }

    const showImages = () => {
        console.log(images)
    }

    const selectInfo = (id, title, number) => {
        console.log(id, title, number)
        const newInfo = [...info]
        newInfo.map((item) => {
            if (item.number === number) {
                item.title = title
                item.id = id
            }
            return item
        })
        setInfo(newInfo)
    }

    const addDescription = (e, number) => {
        const newInfo = [...info]
        newInfo.map((item) => {
            if (item.number === number) {
                item.description = e.target.value
            }
            return item
        })
        setInfo(newInfo)
    }


    useEffect(() => {
        fetchTypes().then(data => product.setTypes(data))
        fetchGenders().then(data => product.setGenders(data))
        fetchProperties().then(data => product.setProperties(data))
        fetchCatalogs().then(data => product.setCatalogs(data))
      }, [info])

    //name, price, typeId, genderId
      const addProduct = () => {


        createProduct(name, price, product.selectedType.id, product.selectedGender.id)
        .then(data => {
            images.forEach((element) => {
                const formData = new FormData()
                formData.append('productId', data.id)
                formData.append('scr', element.src)
                uploadImage(formData).then(data => setImages([]))
            })
            //add info
            info.forEach((element) => {
                uploadProductInfo(data.id, element.id, element.description).then(data => setInfo([]))
            })
            createCatalogsInfo(product.selectedCatalog.name, product.selectedCatalog.id, data.id)
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
                    Добавить новый товар
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{product.selectedType.name || 'Выберете тип товара'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {product.types.map(el =>
                            <Dropdown.Item onClick={() => product.setSelectedType(el)} key={el.id}>{el.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{product.selectedGender.name || 'Выберете вид товара'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {product.genders.map(el =>
                            <Dropdown.Item onClick={() => product.setSelectedGender(el)} key={el.id}>{el.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{product.selectedCatalog.name || 'Выберете каталог для товара'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {product.catalogs.map(el =>
                            <Dropdown.Item onClick={() => product.setSelectedCatalog(el)} key={el.id}>{el.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form>
                    <Form.Control
                        style={{ marginTop: 3 }}
                        placeholder="Введите наименование товара"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                        style={{ marginTop: 3 }}
                        placeholder="Введите стоимоcть товара"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </Form>
                <hr />
                <Button
                    variant={"outline-dark"}
                    onClick={addImage}
                >
                    Добавить новую фотографию
                </Button>
                {images.map((i) =>
                    <Row
                        key={i.number}
                        className="mt-3"
                    >
                        <Col md={6}>
                            <Form.Control
                                type="file"
                                onChange={(e) => selectFile(e, i.number)}
                            />
                        </Col>
                        <Col md={6}>
                            <Button onClick={() => removeImage(i.number)} variant={"outline-danger"}>x</Button>
                        </Col>
                    </Row>
                )}
                <hr />
                <Button
                    variant={"outline-dark"}
                    onClick={addInfo}
                >
                    Добавить характеристику товара
                    </Button>
                {
                    info.map(i =>
                        <Row className="mt-3 d-flex align-items-center justify-content-center" key={i.number}>
                            <Col md={4}>
                                <Dropdown className="mt-2 mb-2">
                                    <Dropdown.Toggle>{i.title ||'Выберите свойство товара'}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {product.properties.map(el =>
                                        <Dropdown.Item onClick={() => selectInfo(el.id, el.name, i.number)} key={el.id}>{el.name}</Dropdown.Item>
                                             )}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    placeholder="Введите значение свойства"
                                    value={i.description}
                                    onChange={(e) => addDescription(e, i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant={"outline-danger"}
                                    onClick={() => removeInfo(i.number)}
                                >
                                    x
                                </Button>
                            </Col>
                        </Row>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-success"} onClick={addProduct}>Сохранить</Button>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button onClick={showImages}>в консоли</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateProduct;
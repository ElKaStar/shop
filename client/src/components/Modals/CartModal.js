import React, { useEffect, useState, useContext } from 'react'
import { Modal, Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap'
import { deleteProductFrCartProducts, fetchCartProductsByCartId, changeCartProducts, sendCart } from './../../http/productAPI'
import { observer } from 'mobx-react-lite'
import { Context } from './../../index'
//import { createGender } from '../../http/productAPI'

const CartModal = observer(({ show, onHide }) => {

    const { product, user } = useContext(Context)
    const [cartInfo, setCartInfo] = useState([])
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [images, setImages] = useState([])
    const [gotImages, setGotImages] = useState(false)
    

    if (!product.cartProducts) {
        console.log('NONONO')
    }

    const handlePhoneChange = (e) => {
        let val = e.target.value;
        setPhone(val)
    }
    const handleAddressChange = (e) => {
        let userAddress = e.target.value;
        setAddress(userAddress)
    }

    let totalAmount = 0

    if (show) {
        console.log(user)
        product.cartProducts.forEach(element => {
            totalAmount = element.price * element.quantity + totalAmount
        });
    }

    const deleteProduct = (productId) => {
        console.log('product', product.cart)
        deleteProductFrCartProducts(product.cart, productId).then((data) => {
            console.log(data)
        }).finally(() => {
            fetchCartProductsByCartId(product.cart).then(data => {
                product.setCartProducts(data)
            })
        })
    }

    const changeQuantityHandler = (newQuantity, productId) => {
        if (newQuantity === 0) {
            //delete from cart
            deleteProduct(productId)
        } else {
            changeCartProducts(product.cart, productId, newQuantity).then((data) => {
                fetchCartProductsByCartId(product.cart).then(data => {
                    product.setCartProducts(data)
                })
            })
        }
    }

    const sendOrder = () => {
        sendCart(product.cart).then((data) => {
            console.log(data)
        }).finally(() => {
            onHide()
            product.setCartProducts([])
            product.setCart(null)
            alert('Заказ отправлен')
        })
    }





    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            top
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Ваш заказ
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                {!product.cartProducts? 
                   <Row>
                        Нет добавленных товаров
                    </Row>
                :
                product.cartProducts.map((item) => {
                        return (
                            <Row className="d-flex justify-content-center align-items-center" key={item.id} style={{ marginTop: '10px', marginBottom: '10px' }}>
                                <Col md={2}>
                                    <img
                                        style={{ width: '50px', height: '50px' }}
                                        src={item.scr} alt=''></img>
                                </Col>
                                <Col md={3}>
                                    {item.name}
                                </Col>
                                <Col md={2}>
                                    <Button
                                        onClick={() => changeQuantityHandler(item.quantity - 1, item.productid)}
                                        variant="light" className="mr-2">-</Button>
                                    {item.quantity}
                                    <Button
                                        onClick={() => changeQuantityHandler(item.quantity + 1, item.productid)}
                                        className="ml-2" variant="light">+</Button>
                                </Col>
                                <Col md={2}>
                                    {item.price} р.
                                </Col>
                                <Col md={2}>
                                    <Button
                                        onClick={() => deleteProduct(item.productid)}
                                        variant="dark"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                        </svg></Button>
                                </Col>
                            </Row>
                        )
                    })}
                    
                </Container>
                <br />
                <Row>
                    <Col md={6}>
                    </Col>
                    <Col md={6}>
                        <h3>{`Cумма заказа: ${totalAmount} р.`}</h3>
                    </Col>
                </Row>
                <Row style={{ display: 'flex', marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }}>
                    <h4>У вас прекрасный вкус!</h4>
                </Row>

                <Form
                    className="d-flex align-items-center justify-content-center flex-column mb-5 w-75"
                >
                    <h5 className="mt-3">Контактные данные</h5>
                    <Form.Control
                        placeholder='Ваш email'
                        value={user.user.email}
                        type='email'
                    />
                    <Form.Control
                        value={phone}
                        className="phone_mask"
                        type="text"
                        mask="+7(999) 999-99-99"
                        placeholder="+7(999) 999-99-99"
                        onChange={(e) => handlePhoneChange(e)}
                    />
                    <h5 className="mt-3">Доставка</h5>
                    <Form.Control
                        value={address}
                        placeholder='Введите адрес доставки'
                        type='text'
                        onChange={(e) => handleAddressChange(e)}
                    />
                </Form>
                <div style={{ display: 'flex', marginLeft: '10px', marginTop: '5px' }}>
                    <Col>
                        <Row>
                            <p>Мы свяжемся с вами для подтверждения заказа.</p>
                        </Row>
                        <Row>
                            <p>Добавить мерки к заказу можно в вашем профиле.</p>
                        </Row>
                    </Col>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"light"} onClick={() => sendOrder()}>Отправить для подтверждения</Button>
            </Modal.Footer>
        </Modal >
    )
})

export default CartModal;
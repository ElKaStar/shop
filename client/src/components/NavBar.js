import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'
import { fetchCartProductsByCartId, fetchCart } from '../http/productAPI'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, ABOUT_ROUTE, DELIVERY_ROUTE, HOWTO_ROUTE, HOME_ROUTE, PROFILE_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { Container, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import CartModal from './Modals/CartModal'


const NavBar = observer(() => {
    const { user, product } = useContext(Context)
    const history = useHistory()
    const [isCartOpen, setIsCartOpen] = useState(false)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    useEffect(() => {
        if (!user || !user.hasOwnProperty('user') || !user.user.hasOwnProperty('id') || !user.user.id) {
        } else {
            fetchCart(user.user.id).then(data => {
                if (!data || data.result === 'not found') {
                } else {
                    product.setCart(data.id)
                    fetchCartProductsByCartId(data.id).then(data => {
                        product.setCartProducts(data)
                    })
                }
            })
        }

    }, [])

    const clickCartHandler = () => {
        setIsCartOpen(true)
        fetchCartProductsByCartId(product.cart).then(data => {
            product.setCartProducts(data)
        })
    }


    return (
        <Navbar expand="xl" id="navbar" style={{ boxShadow: "10px 7px 5px 0px rgba(68,65,79,0.25)", zIndex: "99" }}>
            <Container>
                <NavLink className="lable" style={{ color: 'black', marginLeft: '10px', textDecoration: 'none', marginRight: '20px', borderRadius: '50%' }} to={HOME_ROUTE}>MiniLi</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Row className="justify-content-between">
                        <Nav className="mr-2 ml-2 pl-2">
                            <NavLink className="link" style={{ color: '#52527a', textDecoration: 'none', borderRadius: '5px' }} to={SHOP_ROUTE}>Каталог</NavLink>
                            <NavLink className="link" style={{ color: '#52527a', textDecoration: 'none' }} to={ABOUT_ROUTE}>О Нас</NavLink>
                            <NavLink className="link" style={{ color: '#52527a', textDecoration: 'none' }} to={HOWTO_ROUTE}>Как снять мерки</NavLink>
                            <NavLink className="link" style={{ color: '#52527a', textDecoration: 'none' }} to={DELIVERY_ROUTE}>Оплата и доставка</NavLink>

                        </Nav>
                        <Nav className="mr-2 ml-2 pl-2">
                            {user.isAuth ?
                                <Nav>
                                    <Button className="mr-1" onClick={() => history.push(ADMIN_ROUTE)} variant={"outline-dark"}>Админ панель</Button>
                                    <Button className="mr-1" onClick={() => logOut()} variant={"outline-dark"}>Выйти</Button>
                                </Nav>
                                :
                                <Nav>
                                    <Button className="mr-1" variant={"outline-dark"} onClick={() => history.push(LOGIN_ROUTE)}>Log In</Button>
                                </Nav>
                            }
                            <Nav>
                                <Button className="mr-1" variant={"outline-dark"} onClick={() => clickCartHandler()}>Корзина</Button>
                            </Nav>
                            <Nav>
                                <Button className="mr-1" variant={"outline-dark"} onClick={() => history.push(PROFILE_ROUTE)}>Профиль</Button>
                            </Nav>
                        </Nav>
                    </Row>
                </Navbar.Collapse>
            </Container>
            <CartModal show={isCartOpen} onHide={() => setIsCartOpen(false)} />
        </Navbar>
    )
})

export default NavBar;
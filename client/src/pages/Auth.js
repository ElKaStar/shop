import React, { useContext, useState } from 'react'
import { Container, Card, Form, Button, Row } from 'react-bootstrap'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { login, registration } from '../../src/http/userAPI'
import { fetchCart, fetchCartProductsByCartId, createCart } from '../../src/http/productAPI'
import { REGISTRATION_ROUTE, HOME_ROUTE } from '../utils/consts'
import { LOGIN_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { Context } from '..'

const AuthPage = observer(() => {

  const { user, product } = useContext(Context)
  const history = useHistory()
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const clickHandler = async () => {
    try {
      let currUser
      if (isLogin) {
        currUser = await login(email, password)
      } else {
        currUser = await registration(email, password)
      }
      console.log('currUser1', currUser)
      if (!currUser) {
        console.log('currUser', currUser)
      } else {
        user.setUser(currUser)
        user.setIsAuth(true)
        console.log('currUser10', currUser)
        let cart = await fetchCart(currUser.id)
        if (!cart || cart.result === 'not found') {
          console.log('currUser2', currUser)
          cart = await createCart(currUser.id)
          product.setCart(cart)

        } else {
          console.log('currUser3', currUser)
          product.setCart(cart.id)
        }
      }
      history.push(HOME_ROUTE)
    } catch (e) {
      throw e
    }

  }

  return (
    <Container className="d-flex justify-content-center align-items-center p-5">
      <Card style={{ width: '600px' }} className="p-5">
        <h2 className="m-auto"> {isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите пароль"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink> </div>
              : <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink> </div>
            }
            <Button
              variant={"outline-dark"}
              onClick={() => clickHandler()}
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  )
})

export default AuthPage;
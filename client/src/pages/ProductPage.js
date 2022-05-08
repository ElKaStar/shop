import React, { useEffect, useState, useContext } from 'react'
import { Container, Col, Row, Card, Button, Spinner } from 'react-bootstrap';
import CarouselComponent from '../components/Carousel'
import star from '../accets/star.jpg'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { fetchOneProduct, fetchCart, createCart, createCartProducts, fetchTypeById, fetchCartProductsByCartIdAndProductId, fetchCartProductsByCartId } from '../http/productAPI'
import { Context } from '../index'
import PopUp from '../components/Modals/PopUp'

const ProductPage = observer(() => {
  const { product, user } = useContext(Context)
  const [state, setState] = useState({ info: [], images: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [cart, setCart] = useState()
  const [isCart, setIsCart] = useState(false)
  const { id } = useParams()
  const [popUpVisible, setPopUpVisible] = useState(false)
  const [selectedType, setSelectedType] = useState()

  useEffect(() => {
    fetchOneProduct(id).then(data => setState(data)).finally(() => {
      setIsLoading(false)
      if (!state.typeId) {

      } else {
        fetchTypeById(state.typeId).then(data => setSelectedType(data.name))
      }
      
      fetchCart(user.user.id).then(data => {
        if (!data || data.result === 'not found') {

        } else {
          setCart(data.id)
          product.setCart(data.id)
          fetchCartProductsByCartIdAndProductId(data.id, id).then(data => {
            
            try {
              if (!data) {
                console.log('here f')
                setIsCart(false)
              } else if (data.length === 0) {
                setIsCart(false)
              } else {
                setIsCart(true)
              }
            } catch (error) {
              throw error
            }

          })
        }
      })
    })

  }, [user, state.typeId])

  const showPopUp = () => {
    console.log('isCart', isCart)
    alert("Товар добавлен в корзину")
  }



  if (isLoading) {
    return <Spinner animation={"grow"} />
  }

  const adjImages = state.images.map(e => {
    return `process.env.REACT_APP_API_URL` + `static/${e.scr}`
  })

  const addToCart = () => {
    console.log('cart', cart)
    if (!cart) {
      createCart(user.user.id).then(data => {
        setCart(data.id)
        product.setCart(data.id)
        createCartProducts(data.id, id, state.price, 1).then(data => {
        }).finally(() => {
          setIsCart(true)
          showPopUp()
          fetchCartProductsByCartId(data.id).then(data => {
            product.setCartProducts(data)
          })
        })
      })
    } else {
      createCartProducts(cart, id, state.price, 1).then(data => {
      }).finally(() => {
        setIsCart(true)
        showPopUp()
      })
    }
    fetchCartProductsByCartId(cart).then(data => {
      product.setCartProducts(data)
    })

  }

  let count = 0
  const getCount = () => {
    count++
    return count
  }


  return (
    <Container>
      <Row className="mt-3">
        <Col md={8}>
          <CarouselComponent images={adjImages} />
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-left justify-content-around border-0"
          > <h3 style={{ fontSize: '22px', marginTop: '2px' }}>{state.name} </h3>
            {!selectedType ? '' : <p>{`Размещено в разделе: ${selectedType}`}</p>}
            <hr />
            <h3 style={{ fontSize: '18px' }}>Цена: {state.price} руб.</h3>
            <hr />
            {isCart ?
              <p
                className="mt-3"
                variant={"outline-dark"}
                style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;' }}
              >Товар добавлен в корзину</p>
              :
              <Button
                className="mt-3"
                variant={"outline-dark"}
                onClick={() => addToCart()}
              >Добавить в корзину</Button>}
          </Card>
          <h3 className="mt-5 mb-3" style={{ fontSize: '20px' }}>Характеристики</h3>
          {state.info.map((i, index) => {

            return (<Row
              key={i.id}
              className="d-flex mt-2"
              style={{ background: index % 2 !== 0 ? "lightgray" : "transparant" }}
            >
              <Col md={3}>
                {getCount()}
              </Col>
              <Col md={9}>
                {i.description}
              </Col>
            </Row>)
          })}
        </Col>
      </Row>
    </Container>
  )
})

export default ProductPage;
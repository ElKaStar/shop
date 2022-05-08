import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Card, Button, Container, Badge } from "react-bootstrap";
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchNewCatalogsInfo } from '../http/productAPI'

const NewItems = observer(() => {
  const { product } = useContext(Context)
  const [limit, setLimit] = useState(3);

  const [currentCount, setCurrentCount] = useState(0);
  const [state, setState] = useState([])
  const [arrNewProducts, setArrNewProducts] = useState([])

  const loadMoreNewProducts = () => {
    setLimit(limit + 3)
    countLimit = 0
  };
  let countLimit = 0
  let currEl = 0

  const addNewProducts = (state) => {

    if (!state) {
      return null
    }
    //console.log(state)
    const resArr = []
    state.forEach(item => {
      if (currEl !== item.id) {
        const newElArr = {
          id: item.id,
          price: item.price,
          images: [item.scr],
          name: item.name
        }
        resArr.push(newElArr)
      } else {
        resArr.forEach(el => {
          if (el.id === item.id) {
            el.images.push(item.scr)
            return el
          }
          return el
        })
      }
      currEl = item.id
    })
    setArrNewProducts(resArr)
    console.log('arrNewProducts', arrNewProducts)
  }

  useEffect(() => {
    console.log('useEffect1')
    fetchNewCatalogsInfo().then(data => product.setNewProducts(data))
  }, []);

  useEffect(() => {
    console.log('useEffect2')
    addNewProducts(state)
  }, [state, limit])

  useEffect(() => {
    console.log('useEffect3', limit)
    setState(product.newProducts)

  }, [product.newProducts])





  if (!arrNewProducts || arrNewProducts.length === 0) {
    return (
      <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Row className="d-flex justify-content-center align-items-center">
          <div
            style={{
              border: "1px solid black",
              fontSize: "22px",
              paddingTop: "15px",
              paddingBottom: "15px",
              paddingLeft: "30px",
              paddingRight: "30px"
            }}
          >
            Наши новинки уже будут доступны в ближайшее время
          </div>
        </Row>
      </Container>
    )
  }

  return (
    <Container style={{ marginTop: "30px", marginBottom: "30px" }}>
      <Row className="d-flex justify-content-center align-items-center">
        <div
          style={{
            border: "1px solid black",
            fontSize: "22px",
            paddingTop: "15px",
            paddingBottom: "15px",
            paddingLeft: "30px",
            paddingRight: "30px"
          }}
        >
          Наши новинки
        </div>
      </Row>
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <Row style={{ marginTop: "30px" }}>
          {arrNewProducts.map(el => {
            countLimit++
            if (countLimit > limit) {
              return (<div></div>)
            }
            return (
              <Col
                className="d-flex justify-content-center align-items-center mt-3"
                md={4}
              >
                <Card className="card_new_product">
                  <Card.Img
                    className="img_card_new_product"
                    onMouseOver={e => (e.currentTarget.src = process.env.REACT_APP_API_URL + `${el.images[0]}`)}
                    onMouseOut={e => (e.currentTarget.src = (!el.images[1] ? process.env.REACT_APP_API_URL + `${el.images[0]}` : process.env.REACT_APP_API_URL + `${el.images[1]}`))}
                    variant="top"
                    src={(process.env.REACT_APP_API_URL + `${el.images[0]}`)}
                  />
                  <Card.Body className="card_body">
                    <Card.Text>
                      <hr style={{ paddingTop: '0px', marginTop: '0px' }} />
                      <Row className="d-flex justify-content-between ml-2 mr-2 mt-2 pt-2">
                        <h3 style={{ fontSize: '18px' }}>{el.name} <Badge variant="secondary" className="ml-2">New</Badge></h3>
                        <h3 style={{ fontSize: '18px' }}>{`${el.price} p.`}</h3>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row>
          {limit >= arrNewProducts.length ? '' :
            <Button
              onClick={() => loadMoreNewProducts()}
              className="load-more"
              variant="light"
            >
              Посмотреть еще..
            </Button>
          }
        </Row>
      </Container>
    </Container>
  );
})

export default NewItems
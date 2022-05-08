import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col} from 'react-bootstrap';
import GenderBar from '../components/GenderBar';
import TypeBar from '../components/TypeBar'
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { fetchGenders, fetchTypes, fetchProducts, fetchProperties } from '../http/productAPI';
import Pages from '../components/Pages';

const ShopPage = observer(() => {

  const {product} = useContext(Context)
  const [currentPage, setCurrenctPage] = useState(1)

  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data))
    fetchGenders().then(data => product.setGenders(data))
    fetchProperties().then(data => product.setProperties(data))
    fetchProducts(null, null, product.limit, currentPage).then(data => {
      product.setProducts(data.rows)
      product.setTotalCount(data.count)
    })
  }, [])

  useEffect(() => {
    fetchProducts(product.selectedType.id, product.selectedGender.id, product.limit, product.page).then(data => {
      product.setProducts(data.rows)
      product.setTotalCount(data.count)
  })}, [product.page, product.selectedType, product.selectedGender])

  //add Pages later
  return (
   <Container>
     <Row className="mt-2">
       <Col md={3}>
          <TypeBar />
       </Col>
       <Col md={9}>
          <GenderBar />
          <ProductList />
         
       </Col>
     </Row>
   </Container>
  )
})

export default ShopPage;
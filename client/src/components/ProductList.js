import React, { useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { Row, Col, Container } from 'react-bootstrap'
import ProductItem from '../components/ProductItem'

const ProductList = observer(() => {
    const { product, user } = useContext(Context)
    const selectedType = product.selectedType.id
    const selectedGender = product.selectedGender.id
    const anotherGender = 3
    console.log(product)
    return (
        <Row className="d-flex">
            {product.products.map(element => {
                if (!element.hasOwnProperty('images')) {
                    element.images = []
                }
                if ((element.typeId === selectedType || !selectedType) & (element.genderId === selectedGender || element.genderId === anotherGender || !selectedGender)) {
                    return <ProductItem key={element.id} product={element} role={user.user.role} />
                }
            })}
        </Row>
    )
})

export default ProductList;
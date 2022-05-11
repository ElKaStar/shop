import React from 'react'
import { Col, Card, Image, Row, Button } from 'react-bootstrap'
import star from '../accets/star.jpg'
import { Context } from '../index'
import productTemplate from '../accets/product_img.jpg'
import { useHistory } from 'react-router'
import { PRODUCT_ROUTE } from '../utils/consts'
import getImage from '../http/productAPI'

const ProductItem = ({ product, role }) => {
    const history = useHistory()
    const height = role === 'ADMIN' ? '28rem' : '25rem'

    const getImages = async (scr) => {
        if (!scr) {
            return productTemplate
        }
        const image = await getImage(scr)
        return image
    }
    return (
        <Card
            onClick={() => history.push(PRODUCT_ROUTE + '/' + product.id)}
            style={{ width: '15rem', height: { height } }} className='m-2 text-center cardStyle'>
            <Card.Img
                style={{ width: '15rem', height: '18rem' }}
                variant="top" className="m-auto p-2" 
                src={getImages(product.images[0].scr)} />
            <Card.Body className="m-0 pb-1 pt-1">
                <Card.Title>{product.name}</Card.Title>
                <hr style={{ paddingTop: '0px', marginTop: '0px' }} />
                <Row className="d-flex justify-content-between ml-3 mr-3 align-items-lg-center mt-0 mb-2 pt-0 pb-0">
                    <h3 style={{ fontSize: '18px' }}>{`${product.price} p.`}</h3>
                    <h3 className="button-style"  
                    style={{ cursor: 'pointer' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                    </h3>
                </Row>
            </Card.Body>
            {role === 'ADMIN' ? <Button className="delete-button">Удалить</Button> : ''}
        </Card>
    )
}

export default ProductItem;
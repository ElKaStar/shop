import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Card, Button, Spinner } from 'react-bootstrap';
import CarouselComponent from '../components/Carousel'
import star from '../accets/star.jpg'
import { useParams } from 'react-router-dom'
import { fetchOneProduct } from '../http/productAPI'
import Slides from '../components/Slides'
import NewItems from '../components/NewItems'
import CatalogCards from '../components/CatalogCards'

const HomePage = () => {
    const [product, setProduct] = useState({ info: [], images: [] })
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()



    if (isLoading) {
        return <Spinner animation={"grow"} />
    }

    const adjImages = product.images.map(e => {
        return process.env.REACT_APP_API_URL + `${e.scr}`
    })



    return (
        <div>
            <Slides />
            <NewItems />
            <CatalogCards />
        </div>
    )
}

export default HomePage;
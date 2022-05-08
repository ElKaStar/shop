import React from 'react'
import { Carousel} from 'react-bootstrap'

const wHeight = window.innerHeight
const imageWidth = wHeight*2/3*.87
console.log('wHeight', wHeight *0.5)

const CarouselComponent = ({images}) => {
   
    return (
          <Carousel fade> 
            {images.map(image =>
            
                <Carousel.Item 
                key={image.index}
                className="product_image"
                >
                    <img
                       style={{height: wHeight * 0.87, width: imageWidth, marginLeft:"160px"}}
                        className="d-block"
                        src={image}
                        alt=""
                    />
                </Carousel.Item>
            )
            }
        </Carousel>  
    )
}

export default CarouselComponent;
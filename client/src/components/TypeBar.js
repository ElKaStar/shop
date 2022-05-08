import React, { useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'

const TypeBar = observer(() => {
    const { product } = useContext(Context)
    //add empty element
   
    return (
        <ListGroup className="mt-5">
            <ListGroup.Item
                style={{ 
                    cursor: 'pointer'
                 }}
                active={!product.selectedType.id & !product.selectedGender.id}
                key={0}
                onClick={() => {
                    product.setSelectedType(0)
                    product.setSelectedGender(0)
                }}
            >
                Весь каталог
            </ListGroup.Item>
            {product.types.map((element) => {
               // console.log(product.selectedType.id)
                return <ListGroup.Item
                    className="types"
                    style={{ cursor: 'pointer' }}
                    active={element.id === product.selectedType.id}
                    key={element.id}
                    onClick={() => product.setSelectedType(element)}
                >
                    {element.name}
                </ListGroup.Item>
            }

            )}
        </ListGroup>
    )
})

export default TypeBar;
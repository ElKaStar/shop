import React, { useContext } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { Card, Row } from 'react-bootstrap'

const GenderBar = observer(() => {
    const { product } = useContext(Context)

    return (
        <Row>
            {product.genders.map((element) => {
            const activeEl = element.id === product.selectedGender.id? 'active': '';
                return <Card
                    key={element.id}
                    className={'p-2 m-1 ' + activeEl}
                    style={{ cursor: 'pointer' }}
                    onClick={() => product.setSelectedGender(element)}
                >
                    {element.name}
                </Card>
            }
            )}
        </Row>
    )
})

export default GenderBar;
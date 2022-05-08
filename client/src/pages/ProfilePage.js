import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { Table, Col, Container } from 'react-bootstrap'
import { getOrders } from '../http/productAPI'


const ProfilePage = observer(() => {

    const { user } = useContext(Context)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders(user.user.id).then(data => {
            setOrders(data)
            console.log(data)
        })
    }, [])




    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#Номер заказа</th>
                        <th>Статус заказа</th>
                        <th>Название товара</th>
                        <th>Количество</th>
                        <th>Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(el => {
                        return (
                            <tr>
                                <td>{el.cartId}</td>
                                <td>{el.statusId}</td>
                                <td>{el.name}</td>
                                <td>{el.quantity}</td>
                                <td>{el.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
})

export default ProfilePage;
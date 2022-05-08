import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap';
import CreateGender from '../components/Modals/CreateGender';
import CreateProduct from '../components/Modals/CreateProduct';
import CreateType from '../components/Modals/CreateType';
import CreateProperty from '../components/Modals/CreateProperty';
import CreateStatus from '../components/Modals/CreateStatus';
import { sendTestEmailApi } from './../http/productAPI'

const AdminPage = () => {

const [genderVisible, setGenderVisible] = useState(false)
const [typeVisible, setTypeVisible] = useState(false)
const [propertyVisible, setPropertyVisible] = useState(false)
const [productVisible, setProductVisible] = useState(false)
const [statusVisible, setStatusVisible] = useState(false)

const sendTestEmail = () => {
  sendTestEmailApi().then(data => {
    console.log(data)
  })
}

  return (
   <Container className="d-flex flex-column">
     <Button onClick={() => setTypeVisible(true)} variant={"outline-dark"} className="mt-2">Добавить тип</Button>
     <Button onClick={() => setGenderVisible(true)} variant={"outline-dark"} className="mt-2">Добавить раздел/пол</Button>
     <Button onClick={() => setPropertyVisible(true)} variant={"outline-dark"} className="mt-2">Добавить новое свойство товара</Button>
     <Button onClick={() => setStatusVisible(true)} variant={"outline-dark"} className="mt-2">Добавить новый статус заказа</Button>
     <Button onClick={() => setProductVisible(true)} variant={"outline-dark"} className="mt-2">Добавить товар</Button>
     <Button onClick={() => sendTestEmail()} variant={"outline-dark"} className="mt-2">Отправить тестовое письмо</Button>
 
     <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
     <CreateGender show={genderVisible} onHide={() => setGenderVisible(false)}/>
     <CreateProduct show={productVisible} onHide={() => setProductVisible(false)}/>
     <CreateProperty show={propertyVisible} onHide={() => setPropertyVisible(false)}/>
     <CreateStatus show={statusVisible} onHide={() => setStatusVisible(false)}/>
   </Container>
  )
}

export default AdminPage;
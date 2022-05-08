import * as React from "react";
import NavBar from "../components/NavBar";
import Slides from "../components/Slides";
import NewItems from "../components/NewItems";
import CatalogCards from "../components/CatalogCards";
import { Row, Col, Figure, Container, Image } from "react-bootstrap";

export default function Delivery() {
  return (
    <div
      style={{
        backgroundColor: "#d6d6d6",
        width: window.innerWeight,
        height: window.innerHeight
      }}
    >
      <Container className="d-flex align-items-center justify-content-center" style={{marginTop: '50px'}}>
        <Row>
          <Col md={1}></Col>
          <Col md={5}>
            <div id="delivery">        
            <Image
              src="https://secure.i.telegraph.co.uk/multimedia/archive/02555/post-office_2555234k.jpg"
              fluid  
            /></div>
          </Col>
          <Col md={4}>
            <h5>БЕСПЛАТНАЯ ДОСТАВКА</h5>
            <p>
              ОТ 10000 РУБЛЕЙ - ДО ПУНКТА ВЫДАЧИ СДЭК ИЛИ ПОЧТОЙ (ПО РОССИИ) ОТ
              15000 РУБЛЕЙ - КУРЬЕРОМ ДО ДВЕРИ
            </p>
            <h5>ОБМЕН И ВОЗВРАТ.</h5>
            <p>
              ОДЕЖДА, ИЗГОТОВЛЕННАЯ ПОД ЗАКАЗ, НЕ ПОДЛЕЖИТ ВОЗВРАТУ. ЕСЛИ ВЫ
              НАШЛИ ДЕФЕКТ НА ИЗДЕЛИИ - СВЯЖИТЕСЬ С НАМИ В ТЕЧЕНИЕ 10 ДНЕЙ ПОСЛЕ
              ПОЛУЧЕНИЯ И МЫ ОБМЕНЯЕМ ЕГО НА ДРУГОЙ. ТРАНСПОРТНЫЕ РАСХОДЫ - ЗА
              НАШ СЧЕТ. ВОЗВРАТ И ОБМЕН ОДЕЖДЫ ИЗ НАЛИЧИЯ ВОЗМОЖЕН В ТЕЧЕНИЕ 10
              ДНЕЙ ПОСЛЕ ПОЛУЧЕНИЯ. ТРАНСПОРТНЫЕ РАСХОДЫ НЕСЕТ ПОКУПАТЕЛЬ.
            </p>
          </Col>
          <Col md={2}> </Col>
        </Row>
      </Container>
    </div>
  );
}

import React from "react";
import { Col, Row, Container } from "../components/Grid";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

const Home = () => {
  return (
    <Container fluid>
      <Row>
        <CategoryMenu />
        <ProductList />
      </Row>
    </Container>
  );
};

export default Home;

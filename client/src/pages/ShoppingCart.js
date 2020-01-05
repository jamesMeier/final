import React from "react";
import { Link } from "react-router-dom"
import Cart from "../components/Cart";
import { Container } from "../components/Grid";

function ShoppingCartPage() {

  return (
    <Container>
      <Cart />
      <div className="mt-5">
        <Link to="home">Back to home</Link>
      </div>
    </Container>
  );
};

export default ShoppingCartPage;

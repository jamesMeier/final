import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  SET_CURRENT_PRODUCT,
  ADD_TO_CART,
  UPDATE_CART,
  ADD_ALL_TO_CART
} from "../utils/actions";

import { idbPromise } from "../utils/hooks";

const Detail = props => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: UPDATE_CART });
    API.getProduct(props.match.params.id)
      .then(res => {
        console.log(res)
        dispatch({ type: SET_CURRENT_PRODUCT, product: res.data });
        if (state.cart.length === 0) {
          idbPromise("best", "cart", "get").then(results => {
            dispatch({ type: ADD_ALL_TO_CART, cart: results });
          });
        }
      })
      .catch(err => console.log(err));
  }, []);

  const addToCart = () => {
    dispatch({
      type: ADD_TO_CART,
      product: state.currentProduct
    });
    idbPromise("best", "cart", "put", state.currentProduct);
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      productId: state.currentProduct.productId
    });
    idbPromise("best", "cart", "delete", state.currentProduct);
  };

  // console.log(state.cart);
  const imgStyle = {
    backgroundcolor: 'blue',
    border: 'red border 3px',
    padding: '0 10px 0 10px',
    minHeight: '100px',
    minWidth: '30%',
    maxWidth: '300px',

  };

  const rowStyle = {
    backgroundColor: 'white',
    margin: '0 10px 0 40px',
    // minHeight: '100%',
    maxWidth: '80%'
  };

  const cardBody = {
    backgroundColor: 'white',
    margin: '0 10px 0 40px',
    // maxWidth: '170%',
  };

  const cardStyle = {
    minWidth: '240px',
    // margin: '0 10px 0 40px',
    // maxWidth: '170%',
  };

  const buttonStyle = {
    minWidth: '100%',
    borderRadius: '5px',
    // backgroundColor: 'black',
    // marginLeft: '30%',
    textAlign: 'center',
  };

  return (
    <>
      {state.currentProduct && state.cart ? (
        <Container fluid >
          <Row>
            <Col size="md-2">
              <Link className="link" to="/">← Back to Products</Link>
            </Col>
          </Row>
          <br />
          <Row>
            <Col size="md-4">
              <div className="card">
                <img
                  className="card-img"
                  src={state.currentProduct.image}
                  alt="product"
                />
                <br />
                {state.cart.filter(p => {
                  return p.productId === state.currentProduct.productId;
                }).length === 0 ? (
                  <button className="btn btn-success" onClick={addToCart}>
                    <i className="fa fa-shopping-cart fa-lg" />
                  </button>
                ) : (
                  <button className="btn btn-danger" onClick={removeFromCart}>
                    <i className="fa fa-remove fa-lg" />
                  </button>
                )}
                <div className="card-body">
                  <h5 className="card-title">{state.currentProduct.name}</h5>
                  <div className="card-text">
                    <strong>Price:</strong>
                    {state.currentProduct.salePrice}
                  </div>
                  <p className="card-text">
                    {state.currentProduct.shortDescription}
                  </p>
                </div>
                <h4>Details:</h4>
                <div>
                  {state.currentProduct.width ? 
                    <div>
                      <strong>Width:</strong>
                      {state.currentProduct.width}
                    </div>
                    : <></>
                  }
                  {state.currentProduct.weight ? 
                    <div>
                      <strong>Weight:</strong>
                      {state.currentProduct.weight}
                    </div>
                    : <></>
                  }
                </div>
              </div>
              
            </Col>
          </Row>
          <br />
          <Row />
        </Container>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default Detail;

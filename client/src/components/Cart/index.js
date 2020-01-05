import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import { Container } from "../Grid";
import CartItem from "../CartItem";
import { useStoreContext } from "../../utils/GlobalState";
import {
  LOADING,
  UPDATE_CART,
  REMOVE_FROM_CART,
  ADD_ALL_TO_CART
} from "../../utils/actions";
import { idbPromise } from "../../utils/hooks";
import styles from "./style.css";

const Cart = () => {

  const [state, dispatch] = useStoreContext();

  const getCart = () => {
    dispatch({ type: LOADING });
    dispatch({ type: UPDATE_CART });
  };

  const removeFromCart = product => {
    dispatch({
      type: REMOVE_FROM_CART,
      productId: product.productId
    });
    idbPromise("best", "cart", "delete", product);
  };

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach(item => {
      sum += item.salePrice;
    });
    return sum.toFixed(2);
  }

  useEffect(() => {
    if (state.cart.length === 0) {
      idbPromise("best", "cart", "get").then(results => {
        dispatch({ type: ADD_ALL_TO_CART, cart: results });
      });
    }
    getCart();
  }, []);

  return ( 
    <div className="container mb-5 mt-5">
      <h1 className="text-center">Shopping Cart</h1>
      {state.cart.length ? (
        <Container fluid>
          <h3 className="mb-5 mt-5">
            Click on an item in your cart to view in detail
          </h3>
          <table className="table table-hover table-condensed">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {state.cart.map(item => (
                <CartItem item={item} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <Link className="btn btn-blue" to="/">
                    <i className="fa fa-angle-left" /> Continue Shopping
                  </Link>
                </td>
                <td colspan="2" className="hidden-xs" />
                <td className="hidden-xs text-center">
                  <strong>Total: {calculateTotal()}</strong>
                </td>
                <td>
                  <Link to="checkout" className="btn btn-success btn-block">
                    Checkout <i className="fa fa-angle-right" />
                  </Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </Container>
      ) : (
        <h3>
          <span className="shocked-emoji" role="img" aria-label="shocked">😱</span>
          You haven't added anything to your cart yet!</h3>
      )}
    </div>
  );
}

export default Cart;
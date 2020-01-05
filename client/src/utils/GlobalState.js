import React, { createContext, useReducer, useContext } from "react";
import {
  SET_CURRENT_PRODUCT,
  REMOVE_PRODUCT,
  UPDATE_PRODUCTS,
  ADD_PRODUCT,
  ADD_TO_CART,
  ADD_ALL_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  LOADING
} from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.product,
        loading: false
      };

    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
        loading: false
      };

    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.product, ...state.products],
        loading: false
      };

    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => {
          return product._id !== action._id;
        })
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [action.product, ...state.cart],
        loading: false
      };

    case ADD_ALL_TO_CART:
      return {
        ...state,
        cart: [...action.cart, ...state.cart],
        loading: false
      };

    case UPDATE_CART:
      return {
        ...state,
        cart: [...state.cart],
        loading: false
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => {
          return product.productId !== action.productId;
        })
      };

    case LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    currentProduct: {
      _id: 0,
      title: "",
      body: "",
      author: ""
    },
    cart: [],
    loading: false
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

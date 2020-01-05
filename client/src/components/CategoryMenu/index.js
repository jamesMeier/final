import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import Search from "../Search";
import { Row, Col, Container } from "../Grid";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import API from "../../utils/API";

function CategoryMenu() {
  const [store, dispatch] = useStoreContext();
  const category = ["CAMERAS", "TELEVISION", "COMPUTERS", "MONITORS"];
  const handleClick = search => {
    API.getProducts(search)
      .then(results => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: results.data
        })
      })
      .catch(err => console.error(err));
  };
  return (
    <Container>
      <Row>
        <Col size="sm-12">
          <Search />
          {store.loading ? (
            <a className="navbar-brand ml-auto">Loading...</a>
          ) : (
            <></>
          )}
        </Col>
        <div className="category-heading" >
          Pick a category:
        </div>
      { category.map( item => 
        <Col size="md-2">
          <button className="category-item" onClick={() => {
            handleClick(item)
          }}>
            {item}
          </button>
        </Col>
      )}
      </Row>
      </Container>
  );
}

export default CategoryMenu;

import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function ProductItem({
  thumbnailImage,
  name,
  shortDescription,
  _id,
  salePrice
}) {
  return (
    <div className="productItemContainer">
      <Link to={`/products/${_id}`}>
        <img className="productImage img-fluid" src={thumbnailImage} />
        <div className="productTitleContainer">
          <p className="detailLink">{name}</p>
        </div>
      </Link>{" "}
      <div className="productDescriptionContainer" >
        <span className="productPrice">${salePrice}</span>
        <p className="description">{shortDescription} </p>
      </div>
    </div>
  );
}

export default ProductItem;

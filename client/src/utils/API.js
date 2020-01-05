import axios from "axios";
import data from "../data.json";

export default {
  // Gets all products
  getProducts: function(query = "") {
    return axios.get("http://localhost:3001/api/products?q=" + query);
  },
  // Gets the product with the given id
  getProduct: function(id) {
    return axios.get("http://localhost:3001/api/products/" + id);
  },
  // Get category
  getClass: function(query) {
    return axios.get("http://localhost:3001/api/products/category?q=" + query);
  },
  // Deletes the product with the given id
  deleteProduct: function(id) {
    return axios.delete("http://localhost:3001/api/products/" + id);
  },
  // Saves a product to the database
  saveProduct: function(productData) {
    return axios.post("http://localhost:3001/api/products", productData);
  },

  // Gets a single user by id
  getUser: id => {
    return axios.get(`/api/users/${id}`);
  },
  // sign up a user to our service
  signUpUser: (email, password) => {
    return axios.post("api/users/signup", {
      email: email,
      password: password
    });
  },
  searchTerms: function(query) {
    return data.filter(search => {
      return query === search.title;
    });
  },
  searchCategory: function(query) {
    return data.filter(search => {
      return query === search.category;
    });
  }
};

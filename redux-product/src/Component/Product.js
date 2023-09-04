import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

const Product = () => {
  const [products, getProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((result) => getProducts(result));
  }, []);
  const card = products.map((products) => {
    return (
      <div className="col-md-3 mb-3">
        <Card className="h-100">
          <center>
            <Card.Img
              variant="top"
              src={products.image}
              style={{ height: "130px", width: "100px" }}
            />
          </center>
          <Card.Body>
            <Card.Title>{products.title}</Card.Title>
            <Card.Text>{products.price}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <center>
              <Button variant="warning">Add to Cart</Button>
            </center>
          </Card.Footer>
        </Card>
      </div>
    );
  });
  return (
    <>
      <h1 className="text-center">Products</h1>

      <div className="row">{card}</div>
    </>
  );
};

export default Product;

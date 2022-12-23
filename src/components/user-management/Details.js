import React, { useEffect, useState } from "react";
import axios from "axios";

const Details = () => {
  const [info, setInfo] = useState([]);
  const [visibleInfo, setVisibleInfo] = useState(5);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = () => {
    axios
      .get(`https://dummyjson.com/products`)
      .then((response) => {
        console.log(response);
        setInfo(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (productId) => {
    const updatedProducts = info.filter((product) => product.id !== productId);
    setInfo(updatedProducts);
  };

  const loadMoreInfo = () => {
    setVisibleInfo((prevInfo) => prevInfo + 5);
  };

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Sl No.</td>
            <td>Product Name</td>
            <td>Product Description</td>
            <td>Product Image</td>
            <td>Delete</td>
          </tr>
        </thead>

        {info.slice(0, visibleInfo).map((product, index) => (
          <tbody>
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product?.title}</td>
              <td>{product?.description}</td>
              <td>
                <img src={product?.images[0]} height="100" />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <button type="button" className="btn btn-warning" onClick={loadMoreInfo}>
        Load
      </button>
    </div>
  );
};

export default Details;

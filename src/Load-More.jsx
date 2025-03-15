import React from "react";
import { useEffect, useState } from "react";

function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );
      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevData) =>[...prevData, ...result.products]);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(()=> {
    if(products && products.length === 100) setDisableButton(true);
  },[products])

  if (loading) {
    return <div className="loading">Loading Data, Please Wait.</div>;
  }

  return (
    <>
       <div className="container">
            <div className="product-container">
                {products && products.length
                ? products.map((item) => (
                    <div className="product" key={item.id}>
                        <img src={item.thumbnail} alt={item.title}></img>
                        <p>{item.title}</p>
                    </div>
                    ))
                    : null}
            </div>
            <div className="button-container">
                <button disabled={disableButton} onClick={() => setCount(count + 1)}>
                    Load More Products
                </button>
                {
                    disableButton ? <div className="message">YOU HAVE REACHED THE BUTTOM.</div> : null
                }
            </div>
        </div>
    </>
  );
}

export default LoadMore;

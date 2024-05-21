import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct } from '../../slices/productSlice';
import Loader from '../layouts/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id]);

  if (status === 'loading') {
    return  <Loader />;;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container-fluid my-5 d-flex justify-content-center align-items-center">
      <br/>
      <div className="card my-5" style={{ boxShadow: '0 0 10px blue' }}>
        <h2 className="card-header text-center">Product Details</h2>
        <div className="card-body">
          {product && (
            <div className='my-5 text-center'>
              <h3>{product.name}</h3>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> {product.price}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default ProductDetails;

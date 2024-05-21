import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, removeProduct } from '../../slices/productSlice';
import { Link } from 'react-router-dom';
import Loader from '../layouts/Loader';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const handleDeleteProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div className="d-flex justify-content-center align-items-center vh-100"><h1>Error: {error}</h1></div>;
  }

  return (
    <div className='my-5'>
      <br/>
      <div className='p-1 my-5' style={{ boxShadow: '0 0 10px blue' }}>
      <h2 className='my-5 text-center'>Products Dashboard</h2>
      </div>
      <table className="table table-bordered table-striped" style={{ boxShadow: '0 0 10px blue' }}>
        <thead>
          <tr>
            <th className='text-center'>Title</th>
            <th className='text-center'>Description</th>
            <th className='text-center'>Price</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className='text-center'>{product.title}</td>
              <td className='text-center'>{product.description}</td>
              <td className='text-center'>${product.price}</td>
              <td className="text-center">
                <div className="btn-group">
                  <Link to={`/products/product-form/${product.id}`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                  <Link to={`/products/product-details/${product.id}`} className="btn btn-sm btn-outline-secondary">Details</Link>
                  <button onClick={() => handleDeleteProduct(product.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, updateProduct } from '../../api/productApi';
import { fetchProduct } from '../../slices/productSlice';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
    });
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const { product } = useSelector((state) => state.product);


    useEffect(() => {
      
      if (id) {
          dispatch(fetchProduct(id)); 
      } else {
         
          setFormData({
              title: '',
              description: '',
              price: '',
          });
      }
  }, [id]);
  
  useEffect(() => {
      
      if (product && id) {
          setFormData(product);
      }
  }, [product, id]);
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.title) tempErrors.title = 'Title is required';
        if (!formData.description) tempErrors.description = 'Description is required';
        if (!formData.price) tempErrors.price = 'Price is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        try {
            if (id) {
                await dispatch(updateProduct(id, formData)); 
            } else {
                await dispatch(createProduct(formData)); 
            }
            navigate('/products');
        } catch (error) {
            console.error('Error during submitting the form', error);
        }
    };

    return (
      <div className="container-lg d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} className="mt-5 p-4 bg-light rounded shadow-sm" style={{ maxWidth: '600px' }}>
          <h2 className="mb-4 text-center">Add Product</h2>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" id="title" className="form-control w-100" name="title" value={formData.title} onChange={handleInputChange} />
              {errors.title && <span className="text-danger">{errors.title}</span>}
            </div>
            <div className="col-md-6">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea id="description" className="form-control w-100" name="description" value={formData.description} onChange={handleInputChange} />
              {errors.description && <span className="text-danger">{errors.description}</span>}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="price" className="form-label">Price</label>
              <input type="text" id="price" className="form-control w-100" name="price" value={formData.price} onChange={handleInputChange} />
              {errors.price && <span className="text-danger">{errors.price}</span>}
            </div>
            <div className="col-md-6 d-flex align-items-end">
            <button type="submit" className="btn btn-primary btn-block ">Submit</button>
            </div>
          </div>
        
        </form>
      </div>
    );
    
};

export default ProductForm;

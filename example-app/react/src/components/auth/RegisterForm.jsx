import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = { user: { name, email,password }};
    dispatch(setUser(response));
    navigate('/');
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card p-4" style={{ boxShadow: '0 0 10px blue' }}>
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Register</button>
                <br></br>
                <Link to={`/login`}>Log In</Link> 
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

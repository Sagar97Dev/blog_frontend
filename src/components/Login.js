import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../Apis/Api';
import { Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      navigate('/blogs');
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'Error logging in. Please try again.');
      } else {
        toast.error(error);
        console.error('Error logging in:', error);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '60rem', padding: '2rem' }} className="bg-light border border-dark">
        <Card.Body>
          <h2 className="d-flex justify-content-center">Login</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register('email', { required: true })}
                isInvalid={errors.email}
              />
              {errors.email && <p type="invalid" className="text-danger">Email is required</p>}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
                isInvalid={errors.password}
              />
              {errors.password && <p type="invalid" className="text-danger">Password is required</p>}
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">Login</Button>
          </Form>
          <div className="mt-3">
            <p>Want to Go Back <Link to="/">Click here</Link></p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;

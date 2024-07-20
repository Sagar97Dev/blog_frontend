import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Apis/Api';
import { Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; 

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success('Registration successful! Redirecting to login...');
      navigate('/login');
    } catch (error) {
      // Handle error
      const errorMessage = error.response?.data?.message || 'Error registering. Please try again.';
      toast.error(errorMessage);
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '60rem', padding: '2rem' }} className="bg-light">
        <Card.Body>
          <h2 className="d-flex justify-content-center">Register</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group >
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                {...register('username', { required: true })}
                isInvalid={errors.username}
              />
              {errors.username && <p type="invalid" className="text-danger">Name is required</p>}
            </Form.Group>

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

            <Button variant="primary" type="submit" className="mt-3">Register</Button>
          </Form>
          <div className="mt-3">
            <p>Already have an account? <Link to="/login">Log in here</Link></p>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;

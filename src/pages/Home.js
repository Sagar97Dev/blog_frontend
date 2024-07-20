import React from 'react';
import { Container, Card } from 'react-bootstrap';
import NavBar from '../components/NavBar';
import { FaPen } from 'react-icons/fa'; // Example icon

const Home = () => {
  return (
    <>
      <NavBar />
      <Container style={{ paddingTop: '70px', display: 'flex', justifyContent: 'center' }}>
      <Card style={{ width: '60rem', padding: '2rem' }} className="bg-light">
          <Card.Body>
            <h1>Welcome to Blog Application <FaPen size={50} color="#007bff" /></h1>  
            <Card.Text>Share Your Thoughts With the World</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;

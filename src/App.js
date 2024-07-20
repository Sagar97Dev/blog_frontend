import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogList from './components/BlogList';
import CreateEditBlog from './pages/CreateEditBlog';
import Login from './components/Login';
import Register from './components/Register';
import BlogForm from './components/BlogForm';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/create-blog" element={<CreateEditBlog />} />
        <Route path="/edit-blog/:id" element={<CreateEditBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-blog" element={<BlogForm isEditing={false} />} />
      </Routes>
    </Router>
  );
};

export default App;

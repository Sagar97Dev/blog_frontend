import React, { useState, useEffect } from 'react';
import { getBlogs, deleteBlog } from '../Apis/Api';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Form, Card, Modal } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './getBlogFormList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to manage the selected blog for viewing
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchBlogs = async () => {
      try {
        const res = await getBlogs(page, keyword);
        setBlogs(res.data.posts);
        setTotalPages(res.data.pages);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [page, keyword]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleView = (blog) => {
    setSelectedBlog(blog); // Set the selected blog to display details
    setShowModal(true); // Show the modal
  };

  const handleClose = () => {
    setShowModal(false); 
    setSelectedBlog(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      const res = await getBlogs(page, keyword);
      setBlogs(res.data.posts);
      setTotalPages(res.data.pages);
      toast.success('Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Error deleting blog. Please try again.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center vh-100">
      <Card style={{ width: '80rem', padding: '2rem' }} className="bg-light">
        <Card.Body>
          {isLoggedIn && (
            <div className="d-flex justify-content-between mb-3">
              <Link to="/add-blog">
                <Button variant="primary">Add New Blog</Button>
              </Link>
              <Button variant="secondary" onClick={handleLogout}>Logout</Button>
            </div>
          )}
          <Form.Control
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={handleSearch}
            className="mb-3"
          />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>
                  {/* Show 'View' link only if the user is not logged in */}
                    {!isLoggedIn && ( 
                      <Button variant="link" onClick={() => handleView(blog)}>View</Button>
                    )}
                    {isLoggedIn && (
                      <>
                        <Link to={`/edit-blog/${blog._id}`}>
                          <Button variant="primary">Edit</Button>
                        </Link>
                        {'  '}
                        <Button variant="danger" onClick={() => handleDelete(blog._id)}>Delete</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
          {/* Modal for viewing blog details */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedBlog?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{selectedBlog?.content}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogList;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createBlog, updateBlog } from '../Apis/Api';
import { Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogForm = ({ blog, isEditing }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing && blog) {
      setValue('title', blog.title);
      setValue('content', blog.content);
    }
  }, [isEditing, blog, setValue]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('token');
      if (isEditing) {
        await updateBlog(blog._id, data, token);
        toast.success('Blog updated successfully!');
      } else {
        await createBlog(data, token);
        toast.success('Blog created successfully!');
      }
      navigate('/blogs');
    } catch (error) {
      toast.error('Error saving blog. Please try again.');
      console.error('Error saving blog:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '60rem', padding: '2rem' }} className="bg-light">
        <Card.Body>
          <h2 className="d-flex justify-content-center">{isEditing ? 'Edit Blog' : 'Create Blog'}</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                {...register('title', { required: 'Title is required' })}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Content"
                {...register('content', { required: 'Content is required' })}
                isInvalid={!!errors.content}
              />
              <Form.Control.Feedback type="invalid">
                {errors.content?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              {isEditing ? 'Update Blog' : 'Create Blog'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BlogForm;

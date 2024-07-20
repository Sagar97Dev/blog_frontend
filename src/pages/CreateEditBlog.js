import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';
import { getBlogById } from '../Apis/Api';

const CreateEditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // If there's an ID, fetch the blog for editing
      setIsEditing(true);
      const fetchBlog = async () => {
        try {
          const res = await getBlogById(id);
          setBlog(res.data);
        } catch (error) {
          console.error('Error fetching blog:', error);
          navigate('/blogs'); // Redirect if blog not found
        }
      };
      fetchBlog();
    }
  }, [id, navigate]);

  return (
    <div>
      <h1>{isEditing ? '' : ''}</h1>
      <BlogForm blog={blog} isEditing={isEditing} />
    </div>
  );
};

export default CreateEditBlog;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`, {  // Fixed API endpoint
          headers: { Authorization: `Bearer ${token}` }
        });
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(', '));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch post');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/posts/${id}`, {  // Fixed API endpoint
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '48rem' }}>
      <h1 className="form-title">Edit Post</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} required />
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;

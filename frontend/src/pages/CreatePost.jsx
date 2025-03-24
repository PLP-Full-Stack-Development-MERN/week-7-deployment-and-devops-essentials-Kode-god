import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post("https://blog-platform-5alx.onrender.com/api/posts", {  
        title,
        content,
        tags: tags.split(',').map(tag => tag.trim()),
        status: 'published'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '48rem' }}>
      <h1 className="form-title">Create New Post</h1>
      
      <form onSubmit={handleSubmit}>
        {error && <div className="form-error">{error}</div>}
        
        <div className="form-group">
          <label className="form-label">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-input" required />
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="form-input" required />
        </div>

        <div className="form-group">
          <label className="form-label">Tags (comma-separated)</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className="form-input" placeholder="technology, programming, web" />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;

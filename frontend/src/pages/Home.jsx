import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        console.log("API Response:", response.data); // Debugging

        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
        } else {
          console.error("Unexpected API response format", response.data);
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]); // Ensure posts is always an array
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="form-title">Latest Posts</h1>
      
      <div className="posts-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post._id} className="post-card">
              <div className="post-content">
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">
                  {post.content?.substring(0, 150) || "No content available"}...
                </p>
                <div className="post-meta">
                  <span>{post.author?.username || "Unknown Author"}</span>
                  <span>{post.createdAt ? format(new Date(post.createdAt), 'MMM d, yyyy') : "Unknown Date"}</span>
                </div>
                {post.tags?.length > 0 && (
                  <div className="post-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

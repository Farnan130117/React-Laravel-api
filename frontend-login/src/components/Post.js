import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";


export default function Post() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchPosts = async () => {
        try {
          const token = sessionStorage.getItem('token');
          const response = await axios.get('http://127.0.0.1:8000/api/posts', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          const { status, posts } = response.data;
  
          if (status && Array.isArray(posts)) {
            setPosts(posts);
            setError(null);
          } else {
            setError('Invalid response format. Unable to fetch posts.');
          }
        } catch (error) {
          setError('Failed to fetch posts. Please try again.');
        }
      };
  
    useEffect(() => {

  
      fetchPosts();
      
    }, []);

    const deletePost = async (id) => {
        const token = sessionStorage.getItem('token');
        try {
          await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchPosts();
          navigate("/posts");
        } catch (error) {
          console.error(error);
        }
      };
  
    return (
      <div className="container">
        <h2>Posts</h2>
        <h3><Link className="btn btn-info" to={{ pathname: "/addpost" }}>Add POST</Link></h3>
        {error && <div className="error">{error}</div>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>{post.created_at}</td>
                  <td> <Link className="btn btn-info" to={{ pathname: "/editpost/" + post.id }}>Edit</Link>&nbsp;</td>
                  
                  <td><button type="button" className="btn btn-danger"
                                    onClick={()=>{deletePost(post.id)}}
                                    >Delete</button>
                                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No posts available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
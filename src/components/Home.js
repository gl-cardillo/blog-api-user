import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('https://lc-blog-api.herokuapp.com/posts/published')
      .then((res) => {
        setPosts(res.data);
      });
  }, []);



  return (
    <div>
      <div className="nav-bar">
        <h1>The Blog</h1>
      </div>
      <div className="home">
        <h3>Latest articles...</h3>
        <div className="posts-container">
          {posts.map((post, index) => {
            return (
              <div key={index} className="post-container-home">
                <Link to={`post/${post._id}`}>
                  <h4>{post.title}</h4>
                  <p className="time">{post.date_formatted_home}</p>{' '}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <footer>
        <a
          href="https://github.com/gl-cardillo"
          target="_blank"
          rel="noreferrer"
        >
          <p>
            <FaGithub style={{ fontSize: '25px' }} /> Made by Luca Cardillo
          </p>
        </a>
      </footer>
    </div>
  );
}

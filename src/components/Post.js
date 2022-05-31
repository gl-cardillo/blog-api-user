import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPostAndComments, addComment } from '../util/utils';
import { FaGithub } from 'react-icons/fa';

export function Post() {
  const { id } = useParams();

  const [post, setPost] = useState('');
  const [comments, setComments] = useState([]);
  const [render, setRender] = useState(false);
  const [errors, setErrors] = useState([]);

  const [text, setText] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    getPostAndComments(id, setPost, setComments);
  }, [render, id]);

  return (
    <div>
      <div className="nav-bar">
        <Link to={'/blog-api'}>
          <h1>The Blog</h1>
        </Link>
      </div>
      <div className="post-container">
        {post !== '' ? (
          <div className="post">
            <h3>{post.title}</h3>
            <p className='text'>{post.text}</p>
            <div className="time">
              <p>{post.published}</p>
              <p>{post.date_formatted}</p>
              {post.date_update !== null ? (
                <p>Updated at: {post.date_update_formatted}</p>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          'Post not found :('
        )}
        {comments.length > 0 ? (
          <div>
            <h4>Comments:</h4>
            {comments.map((comment, index) => {
              return (
                <div key={index} className="comment-container">
                  <p className="comment-text"> {comment.text}</p>
                  <div className="comment-details">
                    <p>-{comment.username}</p>
                    <p>{comment.date_formatted}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          'no comments at the moment :('
        )}
        <h4 className='add-comment'>Add a comment</h4>
        <div className="comment-form-container">
          {' '}
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            id="name"
          />
          <label htmlFor="comment">Comment:</label>
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            rows={5}
            id="comment"
          />
          <button
            onClick={() =>
              addComment(
                id,
                text,
                username,
                setErrors,
                setRender,
                render,
                setText,
                setUsername
              )
            }
          >
            Add comment
          </button>
          {errors.length > 0 ? (
            <div>
              {errors.map((error, index) => {
                return <p key={index}>{error.msg}</p>;
              })}
            </div>
          ) : (
            ''
          )}
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

import axios from 'axios';

export const getPostAndComments = (id, setPost, setComments) => {
  if (id) {
    axios
      .post('https://lc-blog-api.herokuapp.com/posts/postId', {
        id,
      })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post('https://lc-blog-api.herokuapp.com/comments', {
        id,
      })
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const addComment = (id, text, username, setErrors, setRender, render, setText, setUsername) => {
  axios
    .post('https://lc-blog-api.herokuapp.com/comments/createComment', {
      text,
      username,
      postId: id,
    })
    .then((res) => {
      if (res.data.errors) {
        setErrors(res.data.errors);
      }
      setRender(!render);
      setText('');
      setUsername('');
    })
    .catch((err) => {
      console.log(err);
    });
};
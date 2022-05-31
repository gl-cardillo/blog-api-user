import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Post } from './components/Post';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog-api" element={<Home />} />
        <Route path="/blog-api/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

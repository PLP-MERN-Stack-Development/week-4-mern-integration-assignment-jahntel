import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import postsAPI from '../../api/postsAPI';
import categoriesAPI from '../../api/categoriesAPI';
import UploadWidget from '../UI/UploadWidget';
import Alert from '../UI/Alert';

const PostForm = ({ post }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState(post?.category?._id || '');
  const [image, setImage] = useState(post?.image || '');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesAPI.getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const postData = { title, content, category, image };
      
      if (id) {
        await postsAPI.updatePost(id, postData);
      } else {
        await postsAPI.createPost(postData);
      }
      
      navigate(id ? `/posts/${id}` : '/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Group controlId="title" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="content" className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="category" className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="image" className="mb-3">
        <Form.Label>Featured Image</Form.Label>
        <UploadWidget onUpload={(url) => setImage(url)} />
        {image && (
          <div className="mt-2">
            <img src={image} alt="Preview" className="img-thumbnail" style={{ maxHeight: '200px' }} />
          </div>
        )}
      </Form.Group>

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Processing...' : id ? 'Update Post' : 'Create Post'}
      </Button>
    </Form>
  );
};

export default PostForm;

import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/authContext';
import PostList from '../components/Post/PostList';
import Paginate from '../components/UI/Paginate';
import SearchBox from '../components/UI/SearchBox';
import postsAPI from '../api/postsAPI';
import Loader from '../components/UI/Loader';
import Alert from '../components/UI/Alert';

const HomePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { posts, page, pages } = await postsAPI.getPosts(page, keyword);
        setPosts(posts);
        setPages(pages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, keyword]);

  const searchHandler = (searchTerm) => {
    setKeyword(searchTerm);
    setPage(1);
  };

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <Row className="justify-content-between mb-4">
        <Col md={8}>
          <h1>Latest Posts</h1>
        </Col>
        <Col md={4}>
          <SearchBox onSearch={searchHandler} />
        </Col>
      </Row>
      
      <PostList posts={posts} />
      
      <Paginate
        page={page}
        pages={pages}
        onPageChange={(page) => setPage(page)}
      />
    </Container>
  );
};

export default HomePage;

import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/authContext';
import adminAPI from '../api/adminAPI';
import Loader from '../components/UI/Loader';
import Alert from '../components/UI/Alert';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, statsData] = await Promise.all([
          adminAPI.getUsers(),
          adminAPI.getStats()
        ]);
        setUsers(usersData);
        setStats(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await adminAPI.deleteUser(userId);
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (!user || !user.isAdmin) {
    return <Alert variant="danger">Admin access required</Alert>;
  }

  if (loading) return <Loader />;

  return (
    <Container className="py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text className="display-4">{stats?.users}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Posts</Card.Title>
              <Card.Text className="display-4">{stats?.posts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Categories</Card.Title>
              <Card.Text className="display-4">{stats?.categories}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="mb-3">User Management</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteUser(user._id)}
                  disabled={user._id === user._id}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;

import { useApiData } from '../hooks/useApiData';

function Users() {
  const { items: users, loading, error } = useApiData('users');

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">Error loading users: {error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;

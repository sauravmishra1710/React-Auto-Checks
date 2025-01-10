import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  // lint-staged with git pre-commit hook
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  // eslint-disable-next-line react/jsx-filename-extension
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetcher;

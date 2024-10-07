
'use client';

import { useState, useEffect } from 'react';
import styles from './managePosts.module.css';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts logic here
    setPosts([
      { id: 1, title: 'Post 1', status: 'Published' },
      { id: 2, title: 'Post 2', status: 'Draft' },
    ]);
  }, []);

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log('Post edited:', id);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    console.log('Post deleted:', id);
  };

  const handleStatusChange = (id, status) => {
    // Handle status change logic here
    console.log('Post status changed:', { id, status });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Posts</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>
                <select
                  value={post.status}
                  onChange={(e) => handleStatusChange(post.id, e.target.value)}
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleEdit(post.id)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePosts;

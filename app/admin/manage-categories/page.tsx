
'use client';

import { useState, useEffect } from 'react';
import styles from './manageCategories.module.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories logic here
    setCategories([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ]);
  }, []);

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log('Category edited:', id);
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    console.log('Category deleted:', id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Categories</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <button onClick={() => handleEdit(category.id)}>Edit</button>
                <button onClick={() => handleDelete(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategories;

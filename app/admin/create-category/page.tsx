
'use client';

import { useState } from 'react';
import styles from './createCategory.module.css';

const CreateCategory = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle category creation logic here
    console.log('Category created:', { name });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Category</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Create</button>
      </form>
    </div>
  );
};

export default CreateCategory;

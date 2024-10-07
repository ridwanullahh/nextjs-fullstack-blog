
'use client';

import { useState } from 'react';
import styles from './createPost.module.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle post creation logic here
    console.log('Post created:', { title, content });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Post</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>Create</button>
      </form>
    </div>
  );
};

export default CreatePost;

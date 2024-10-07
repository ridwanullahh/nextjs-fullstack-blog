
'use client';

import Link from 'next/link';
import styles from './adminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <div className={styles.menu}>
        <Link href="/admin/create-post" className={styles.menuItem}>Create Post</Link>
        <Link href="/admin/manage-posts" className={styles.menuItem}>Manage Posts</Link>
        <Link href="/admin/create-category" className={styles.menuItem}>Create Category</Link>
        <Link href="/admin/manage-categories" className={styles.menuItem}>Manage Categories</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useState, useEffect, useCallback } from 'react';
import Card, { CardSkeleton } from '../card/Card';
import styles from './cardList.module.css';
import { getAllPosts } from '@/lib/requests';

type CardListProps = {
  page: number;
  cat?: string | undefined;
};

export const CardList = ({ page, cat }: CardListProps) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { posts: newPosts, count } = await getAllPosts(page, cat);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setHasMore(newPosts.length > 0);
    setLoading(false);
  }, [page, cat]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading || !hasMore) {
        return;
      }
      fetchPosts();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, fetchPosts]);


  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item, index) => (
          <Card item={item} key={index} />
        ))}
      </div>
      {loading && <CardSkeleton />}
    </div>
  );
};

export const CardListSkeleton = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loading Posts...</h1>
      <div className={styles.posts}>
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <PaginationSkeleton />
    </div>
  );
};

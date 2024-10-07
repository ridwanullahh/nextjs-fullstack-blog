'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { FaCopy, FaBookmark, FaShareAlt } from 'react-icons/fa';
import { toast } from '@/components/ui/use-toast';
import { CommentsSkeleton } from '../comments/Comments';
import { useCurrentUser } from '@/hooks/use-current-user';
import profileDefaultImage from '@/public/profile.png';
import Menu from '@/components/menu/Menu';
import { useCallback, useEffect, useState } from 'react';
import DeletePost from '../deletePost/DeletePost';
import styles from './singlePost.module.css';

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const dynamic = 'force-dynamic';

export type UserData = {
  name: string;
  image: string | null;
  email: string;
};

export type PostData = {
  id: string;
  title: string;
  slug: string;
  user: UserData;
  createdAt: string;
  catSlug: string;
  img?: string | null;
  desc: string;
};

export const SinglePost = () => {
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { slug }: { slug: string } = useParams();

  const currentUser = useCurrentUser();

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${domain}/api/posts/${slug}`, {
        cache: 'no-store',
      });
      if (!response || response.status === 404) {
        notFound();
      }

      const data = await response.json();

      setPost(data);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost, slug]);

  if (error) {
    return <div>{error}</div>;
  }

  if (post?.user.image === null) {
    post.user.image = profileDefaultImage.src;
  }

  const author = post?.user || { name: '', image: null, email: '' };

  // TODO: Solve the redirection for the non-existent path to notfound page
  // if ((!loading && post?.slug === null) || undefined) {
  //   notFound();
  // }

  return (
    <>
      {loading ? (
        <SinglePostSkeleton />
      ) : (
        <div className={styles.container}>
          <div className={styles.infoContainer}>
<div className={styles.textContainer}>
  <h1 className={styles.title}>{post?.title}</h1>
  <div className={styles.user}>
    <div className={styles.userImageContainer}>
      <Image
        src={post?.user?.image || profileDefaultImage.src}
        alt=""
        fill
        sizes="(50px)"
        className={styles.avatar}
      />
    </div>
    <div className={styles.userTextContainer}>
      <span className={styles.username}>{post?.user?.name}</span>
      <span className={styles.date}>
        {new Date(post?.createdAt || '').toDateString()}
      </span>
    </div>
  </div>
  <div className={styles.postMeta}>
    <span className={styles.category}>Category: {post?.catSlug}</span>
    <div className={styles.actions}>
<button
  aria-label="Copy link"
  role="button"
  onClick={() => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Link copied to clipboard!' });
  }}
>
  <FaCopy />
</button>
<button aria-label="Bookmark post" role="button">
  <FaBookmark />
</button>
<button
  aria-label="Share post"
  role="button"
  onClick={() => {
    const shareData = {
      title: post?.title,
      text: post?.desc,
      url: window.location.href,
    };
    navigator.share(shareData).catch(console.error);
  }}
>
  <FaShareAlt />
</button>
    </div>
  </div>
</div>

            {post?.img && (
              <div className={styles.imageContainer}>
                <Image
                  src={post?.img}
                  alt=""
                  fill
                  priority={true}
                  sizes="(max-width: 100px)"
                  className={styles.image}
                />
              </div>
            )}
          </div>
          <div className={styles.actionsContainer}>
            <div
              className={`${
                post?.user.name === currentUser?.name
                  ? styles.deleteBtnContainer
                  : styles.hideDeleteBtnContainer
              }`}
            >
              <DeletePost {...post} slug={slug} />
            </div>
            {/* TODO: <div>Update</div> */}
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: post?.desc || '' }}
              />

            </div>
            <Menu />
          </div>
        </div>
      )}
    </>
  );
};

export const SinglePostSkeleton = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonInfoContainer}>
        <div className={styles.skeletonTextContainer}>
          <h1 className={styles.skeletonTitle}>Skeleton title</h1>
          <div className={styles.skeletonUser}>
            <div className={styles.skeletonUserImage} />
            <div className={styles.skeletonUserTextContainer}>
              <span className={styles.skeletonUsername}>Username</span>
              <span className={styles.skeletonDate}>10.03.2023</span>
            </div>
          </div>
        </div>

        <div className={styles.skeletonImageContainer} />
      </div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonPost}>
          <div className={styles.skeletonDescription}>
            <p>Skeleton description</p>
          </div>
          <div className={styles.skeletonComment}>
            {/* TODO: Comment skeleton component here */}
            {/* <CommentsSkeleton /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

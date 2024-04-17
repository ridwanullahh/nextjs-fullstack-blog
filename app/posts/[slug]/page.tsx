import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import Menu from '@/components/menu/Menu';
import { notFound } from 'next/navigation';

import styles from './singlePage.module.css';

const domain = process.env.NEXT_PUBLIC_DOMAIN;

type UserData = {
  name: string;
  image: string;
};

type PostData = {
  title: string;
  user: UserData;
  createdAt: string;
  img?: string | null;
  desc: string;
};

const getData = async (slug: string): Promise<PostData | null> => {
  try {
    const response = await fetch(`${domain}/api/posts/${slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

type SinglePageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: SinglePageProps) {
  const { slug } = params;
  const data: PostData | null = await getData(slug);

  if (!data) {
    notFound();
  }

  return {
    title: data.title,
    description: `Blog post from ${data.user.name}`,
  };
}

const SinglePage: React.FC<SinglePageProps> = async ({ params }) => {
  const { slug } = params;

  const data: PostData | null = await getData(slug);

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data.user.image}
                  alt=""
                  fill
                  sizes="(50px)"
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>
                {new Date(data?.createdAt).toDateString()}
              </span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image
              src={data.img}
              alt=""
              fill
              priority={true}
              sizes="(max-width: 100px)"
              className={styles.image}
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;

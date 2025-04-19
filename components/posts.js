import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import Image from 'next/image';

function Post({ post }) {
  return (
    <article className="post">
      <div className="post-image">
        { post.imageUrl && <Image src={`https://jb-default-bucket.s3.amazonaws.com/images/${post.imageUrl}`} alt="image" width={100} height={100}/>}
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <LikeButton />
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
}

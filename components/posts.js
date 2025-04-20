"use client";
import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import Image from 'next/image';
import { togglePostLikeStatus } from '@/lib/server-actions';
import { useOptimistic } from 'react';

function Post({ post, action }) {
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
            {/* isLiked={post.isLiked} */}
            <form action={action.bind(null, post.id)} className={post.isLiked ? 'liked' : ''}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
    return prevPosts.map(post => {
      if (post.id !== updatedPostId) { return post; }
      post.isLiked = !post.isLiked;
      post.likes += post.isLiked ? 1 : -1;
      return { ...post };
    });
  });

  if (!posts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  };

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost}/>
        </li>
      ))}
    </ul>
  );
}

"use server";
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { redirect } from 'next/navigation';
import slugify from 'slugify';
import { saveImage } from '@/lib/aws-bucket';
import { revalidatePath } from 'next/cache';

export async function createPost(prevState, formData) {
  console.log('createPost ----> ', formData);
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  const errors = [];

  if (!title || !title.trim())     { errors.push('Title is required'); }
  if (!content || !content.trim()) { errors.push('Content is required'); }
  if (!image?.size)                { errors.push('Image is required'); }

  if (errors.length) { return { errors }; }

  const extension = image.name.split('.').pop();
  const imageUrl = `${slugify(title, { lower: true })}.${extension}`;
  await saveImage(image, imageUrl);

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1
  });
  revalidatePath('/', 'layout');
  redirect('/feed');
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/', 'layout');
}
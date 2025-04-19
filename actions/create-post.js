"use server";
import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';

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

  await storePost({
    imageUrl: '',
    title,
    content,
    userId: 1
  });
  redirect('/feed');
}
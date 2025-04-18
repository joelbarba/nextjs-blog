'use client';
import { useFormStatus } from 'react-dom';

export default function FormSubmit() {
  const { pending } = useFormStatus();

  if (pending) { return <p>Submitting...</p> }

  return <>
    <button disabled={pending} type="reset">Reset</button>
    <button disabled={pending}>Create Post</button>
  </>
}
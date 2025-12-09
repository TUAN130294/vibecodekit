import { redirect } from 'next/navigation';

export default function HomePage() {
  // Server-side redirect to kit-guide
  redirect('/kit-guide');
}


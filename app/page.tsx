// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-gray-100">
      <h1 className="text-4xl font-bold mb-4">Portfolio Admin</h1>
      <p className="text-gray-400 mb-8">Manage your projects, photos and categories.</p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:brightness-110 transition"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}

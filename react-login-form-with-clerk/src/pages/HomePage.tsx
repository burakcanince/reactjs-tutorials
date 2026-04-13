import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border border-blue-100 p-10 space-y-8">
        <header className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Login Form with Clerk</h1>
        </header>

        <main className="space-y-6">
          <SignedIn>
            <div className="space-y-4 text-center">
              <p className="text-lg text-slate-700">
                Welcome, <span className="font-semibold text-blue-600">{user?.firstName || user?.username || user?.emailAddresses[0]?.emailAddress}</span> 🎉
              </p>
              <div className="flex justify-center">
                <UserButton />
              </div>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                to="/login"
                className="rounded-xl border border-transparent bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow transition hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl border border-blue-600 px-4 py-3 text-center text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                Register
              </Link>
            </div>
          </SignedOut>
        </main>
      </div>
    </div>
  );
};

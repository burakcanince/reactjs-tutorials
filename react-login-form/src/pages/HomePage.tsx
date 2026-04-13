import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border border-blue-100 p-10 space-y-8">
        <header className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Login Form</h1>
        </header>

        <main className="space-y-6">
          {user ? (
            <div className="space-y-4 text-center">
              <p className="text-lg text-slate-700">
                Welcome, <span className="font-semibold text-blue-600">{user.username}</span> 🎉
              </p>
              <button
                onClick={handleLogout}
                className="cursor-pointer inline-flex justify-center rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
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
          )}
        </main>
      </div>
    </div>
  );
};

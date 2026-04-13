import { SignIn } from '@clerk/clerk-react';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <SignIn
        redirectUrl="/"
        signUpUrl="/register"
      />
    </div>
  );
};

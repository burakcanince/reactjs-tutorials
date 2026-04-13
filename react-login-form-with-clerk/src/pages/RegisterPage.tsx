import { SignUp } from '@clerk/clerk-react';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <SignUp
        redirectUrl="/"
        signInUrl="/login"
      />
    </div>
  );
};

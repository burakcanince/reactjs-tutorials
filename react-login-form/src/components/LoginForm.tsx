import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormField } from './AuthFormField';
import { AuthSubmitButton } from './AuthSubmitButton';
import { AuthSwitchLink } from './AuthSwitchLink';
import { useAuth } from '../contexts/AuthContext';
import type { LoginFormState } from '../types';
import { z } from 'zod';

const initialState: LoginFormState = {
  email: '',
  password: '',
};

const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Enter a valid email'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();
  const [formState, setFormState] = useState<LoginFormState>(initialState);
  const [formErrors, setFormErrors] = useState<Partial<LoginFormState>>({});

  const handleChange = (field: keyof LoginFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      clearError();
    }
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = loginSchema.safeParse(formState);

    if (!parsed.success) {
      const fieldErrors = parsed.error.formErrors.fieldErrors;
      setFormErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    } else {
      setFormErrors({});
    }

    const success = await login(formState.email, formState.password);

    if (success) {
      navigate('/');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <AuthFormField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          value={formState.email}
          error={formErrors.email}
          onChange={handleChange('email')}
          required

        />
        <AuthFormField
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={formState.password}
          error={formErrors.password}
          onChange={handleChange('password')}
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>

      <AuthSubmitButton label="Login" loading={loading} />

      <AuthSwitchLink question="Do you have an account?" label="Register" to="/register" />
    </form>
  );
};

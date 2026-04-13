import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthFormField } from './AuthFormField';
import { AuthSubmitButton } from './AuthSubmitButton';
import { AuthSwitchLink } from './AuthSwitchLink';
import { useAuth } from '../contexts/AuthContext';
import type { RegisterFormState } from '../types';
import { z } from 'zod';

const initialState: RegisterFormState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, 'Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Enter a valid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();
  const [formState, setFormState] = useState<RegisterFormState>(initialState);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof RegisterFormState, string>>>({});

  const handleChange = (field: keyof RegisterFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      clearError();
    }
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = registerSchema.safeParse(formState);

    if (!parsed.success) {
      const fieldErrors = parsed.error.formErrors.fieldErrors;
      setFormErrors({
        username: fieldErrors.username?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      return;
    } else {
      setFormErrors({});
    }

    const success = await register({
      username: formState.username,
      email: formState.email,
      password: formState.password,
    });

    if (success) {
      navigate('/login');
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <AuthFormField
          name="username"
          label="Username"
          value={formState.username}
          error={formErrors.username}
          onChange={handleChange('username')}
          autoComplete="username"
          required
        />
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
          autoComplete="new-password"
          value={formState.password}
          error={formErrors.password}
          onChange={handleChange('password')}
          required
        />
        <AuthFormField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          value={formState.confirmPassword}
          error={formErrors.confirmPassword}
          onChange={handleChange('confirmPassword')}
          required
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </div>

      <AuthSubmitButton label="Register" loading={loading} />

      <AuthSwitchLink question="Already have an account?" label="Login" to="/login" />
    </form>
  );
};

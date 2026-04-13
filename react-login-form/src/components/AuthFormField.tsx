import { type InputHTMLAttributes } from 'react';

interface AuthFormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const AuthFormField = ({ label, error, hint, id, ...rest }: AuthFormFieldProps) => {
  const inputId = id ?? rest.name;

  return (
    <label className="block text-sm text-slate-700 space-y-1" htmlFor={inputId}>
      <span className="font-medium">{label}</span>
      <input
        id={inputId}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-slate-200'
        }`}
        {...rest}
      />
      {hint && !error ? <p className="text-xs text-slate-400">{hint}</p> : null}
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </label>
  );
};

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" })
    .max(20, { message: "Password must be at most 20 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z
    .string()
    .min(5, { message: "Confirm password must be at least 5 characters" })
    .max(20, { message: "Confirm password must be at most 20 characters" })
    .regex(/[A-Z]/, { message: "Confirm password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Confirm password must contain at least one number" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto md:max-w-md w-full mt-16">
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="username" className="font-medium text-gray-700">Username</label>
        <input
          type="text"
          className="border border-gray-300 rounded-md outline-none p-2"
          {...register('username')}
        />
        {errors.username && <p className="text-red-700 text-sm">{errors.username.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="password" className="font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="border border-gray-300 rounded-md outline-none p-2"
          {...register('password')}
        />
        {errors.password && <p className="text-red-700 text-sm">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="confirmPassword" className="font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          className="border border-gray-300 rounded-md outline-none p-2"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p className="text-red-700 text-sm">{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" className="bg-black cursor-pointer font-medium rounded-md text-white text-sm w-full p-3">
        Submit
      </button>
    </form>
  )
}

export default App

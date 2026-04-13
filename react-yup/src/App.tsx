import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
}

const schema = yup.object({
  firstName: yup.string().required('First Name is required').min(3, 'First Name must be at least 3 characters'),
  lastName: yup.string().required('Last Name is required').min(3, 'Last Name must be at least 3 characters'),
  password: yup.string().required('Password is required').min(4, 'Password must be at least 4 characters'),
});

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto md:max-w-md w-full mt-16">
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="firstName" className="font-medium text-gray-700">First Name</label>
        <input
          type="text"
          className="border border-gray-300 rounded-md outline-none p-2"
          {...register('firstName')}
        />
        {errors.firstName && <p className="text-red-700 text-sm">{errors.firstName.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="lastName" className="font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          className="border border-gray-300 rounded-md outline-none p-2"
          {...register('lastName')}
        />
        {errors.lastName && <p className="text-red-700 text-sm">{errors.lastName.message}</p>}
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

      <button type="submit" className="bg-black cursor-pointer font-medium rounded-md text-white text-sm w-full p-3">
        Submit
      </button>
    </form>
  )
}

export default App

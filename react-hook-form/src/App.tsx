import { useForm } from 'react-hook-form';

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
}

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

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
          {...register('firstName', { required: true })}
        />
        {errors.firstName && <p className="text-red-700 text-sm">First Name is required</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="lastName" className="font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          className="border border-gray-300 rounded-md outline-none p-2"
          {...register('lastName', { required: true })}
        />
        {errors.lastName && <p className="text-red-700 text-sm">Last Name is required</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="password" className="font-medium text-gray-700">Password</label>
        <input
          type="password"
          className="border border-gray-300 rounded-md outline-none p-2"
          {...register('password', { required: "Password is required", minLength: { value: 4, message: "Password must be at least 4 characters" } })}
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

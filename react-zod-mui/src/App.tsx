import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Container, Box } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
}

const schema = z.object({
  firstName: z.string().nonempty({ message: 'First Name is required' }).min(3, { message: 'First Name must be at least 3 characters' }),
  lastName: z.string().nonempty({ message: 'Last Name is required' }).min(3, { message: 'Last Name must be at least 3 characters' }),
  password: z.string().nonempty({ message: 'Password is required' }).min(4, { message: 'Password must be at least 4 characters' }),
});

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{  display: 'flex', flexDirection: 'column', gap: 2, mt: 4, padding: 4, border: '1px solid #ccc', borderRadius: '8px' }}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          {...register('firstName')}
        />

        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register('lastName')}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  )
}

export default App

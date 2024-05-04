import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// @mui
import { Container, Card, Stack, TextField, Button, Alert } from '@mui/material';

// react-hook-form
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//
import { API_URL } from '../config-global';
import axiosInstance from '../utils/axios';

import FormProvider from '../components/hook-form';
import { isValidToken, jwtDecode } from './utils';

// ----------------------------------------------------------------------

AuthLimitGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthLimitGuard({ children }) {
  const LoginSchema = Yup.object().shape({
    userName: Yup.string().required('username is required'),
    password: Yup.string().required('Password is required'),
  });
  const defaultValues = {
    userName: '',
    password: '',
  };
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = methods;

  const token = !!localStorage.getItem('limitAccessToken');

  const [allowUser, setAllowUser] = useState(token);

  const onSubmit = async (values) => {
    try {
      const { data } = await axiosInstance.post(`${API_URL}/limit_access_login`, values);
      localStorage.setItem('limitAccessToken', `bearer ${data}`);
      if (data) {
        if (isValidToken(data)) {
          const { exp } = jwtDecode(`Bearer ${data}`);
          let expiredTimer;
          const currentTime = Date.now();
          const timeLeft = exp * 1000 - currentTime;

          clearTimeout(expiredTimer);

          expiredTimer = setTimeout(() => {
            localStorage.removeItem('limitAccessToken');
          }, timeLeft);
          setAllowUser(true);
        }
        reset();
      }
    } catch (error) {
      reset();
      setError('afterSubmit', {
        message: error.message,
      });
      setAllowUser(false);
    }
  };

  useEffect(() => {
    setAllowUser(token);
  }, [token]);

  return (
    <>
      {!allowUser ? (
        <Container
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <Card sx={{ width: 450, padding: 3 }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {!!errors.afterSubmit && (
                  <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}
                <TextField
                  label="User Name"
                  {...register('userName', { required: 'Username is required' })}
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                  disabled={isSubmitting}
                />
                <TextField
                  type="password"
                  label="Password"
                  {...register('password', { required: 'Password is required' })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isSubmitting}
                />
                <Button variant="outlined" type="submit" disabled={isSubmitting}>
                  {!isSubmitting ? 'Login' : 'Logging in...'}
                </Button>
              </Stack>
            </FormProvider>
          </Card>
        </Container>
      ) : (
        children
      )}
    </>
  );
}

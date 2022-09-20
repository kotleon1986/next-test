import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../hooks';
import { NextPageWithLayout } from './_app';
import { LoginDto } from '../store/auth/interfaces';
import { loginUser } from '../store/auth/auth.actions';

const Login: NextPageWithLayout = () => {
    const [isReady, setIsReady] = useState(false)
    const user = useAppSelector(state => state.auth.user)
    const submitInProgress = useAppSelector(state => state.auth.submitInProgress)
    const apiError = useAppSelector(state => state.auth.error)

    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
      if (user) {
        router.push('/')
      } else {
        const token = localStorage.getItem('token')

        if (token) {
          router.push('/')
        } else {
          setIsReady(true)
        }
      }
    }, [user, router])

    const schema = yup.object({
        email: yup
            .string()
            .email('Must be a valid email')
            .required('Email is required'),
        password: yup.string().trim().required('Password is required').min(8, 'Minimum length is 8 chars'),
    })

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
      } = useForm<LoginDto>({ resolver: yupResolver(schema) });


    const onSubmit: SubmitHandler<LoginDto> = async (data) => {
        if (submitInProgress) {
          return;
        }

        dispatch(loginUser(getValues()))
    };

    return isReady ? (
      <>      
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>            
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>            
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <input
                    {...register('email')}
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email"
                  />
                  <p className='mt-2 text-sm text-red-500'>{ errors.email?.message || apiError?.email }</p>
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    {...register('password')}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"                  
                  />
                  <p className='mt-2 text-sm text-red-500'>{ errors.password?.message || apiError?.password }</p>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  disabled={submitInProgress}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  {submitInProgress ? 'Submitting...' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    ) : null
}

export default Login

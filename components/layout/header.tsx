import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { removeUser } from "../../store/auth/auth.slice"

const Header: FC = () => {
  const user = useAppSelector(state => state.auth.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const logoutUser = () => {
    localStorage.removeItem('token')

    dispatch(removeUser())
    router.push('/login')
  }

  return (
    <>
      <nav
  className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light"
>
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <div className="flex collapse navbar-collapse flex-grow items-center">
            <Link href="/" className="text-xl text-white pr-2 font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </Link>
            <span className="ml-2">
              <Link className='bg-indigo-600 ml-2' href={'/about'}>About</Link>
            </span>
          </div>

          <div className="flex items-center relative">
            <div className="dropdown relative">
              {
                user ? (
                  <div className="flex">
                    <span className="dropdown-toggle flex items-center hidden-arrow mr-1 pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      { user.firstName }
                    </span>
                    <span
                      className="dropdown-toggle flex items-center hidden-arrow"
                      style={{cursor: 'pointer'}}
                      onClick={logoutUser}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <Link href="/login" className="dropdown-toggle flex items-center hidden-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </Link>
                )
              }              
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
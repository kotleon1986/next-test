import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { parseToken } from "../../helpers/jwt";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { NextPageWithLayout } from "../../pages/_app";
import { verifyToken } from "../../store/auth/auth.actions";
import { removeUser } from "../../store/auth/auth.slice";
import MainLayout from "../layout/main-layout";

const withAuth = (Component: NextPageWithLayout) => {
    const Auth = (props: any) => {
        const router = useRouter()
        const dispatch = useAppDispatch()
        const user = useAppSelector(state => state.auth.user)
        const verifyInProgress = useAppSelector(state => state.auth.verifyInProgress)

        useEffect(() => {
            if (!user) {
                const token = localStorage.getItem('token')
    
                if (token) {
                    const userData = parseToken(token)
            
                    if (userData) {
                        if (verifyInProgress) {
                            return
                        }

                        dispatch(verifyToken())
                    } else {
                        localStorage.removeItem('token')
                        dispatch(removeUser())
                        router.push('/login')
                    }
                } else {
                    router.push('/login')
                }
            }
        }, [user, verifyInProgress, router, dispatch])
    
        return user ? (
            <Component {...props} user={user} />
        ) : (
            verifyInProgress ? <div>Loading...</div> : null
        );
    };
  
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps
    }

    Auth.layout = Component.layout || MainLayout
  
    return Auth;
  };
  
  export default withAuth;
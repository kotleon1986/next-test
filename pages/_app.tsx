import '../styles/globals.css'
import { FC, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { Provider } from 'react-redux'
import store from '../store/store'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: FC<{ children: ReactNode }>
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const EmptyLayout: FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.layout || EmptyLayout

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

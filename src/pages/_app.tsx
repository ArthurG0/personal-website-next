import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Arthur Gatin's Homepage</title>
      <meta
        name="description"
        key="desc"
        content="Arthur's Website Content"
      ></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    </Head>
    <Component {...pageProps} />
    </>
  )
}

import { GoogleAnalytics } from '@next/third-parties/google'
 
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-4Z6H89W415" />
    </>
  )
}
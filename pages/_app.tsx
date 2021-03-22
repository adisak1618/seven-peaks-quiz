import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Router from "next/router";
import loading from '../lib/loading'
const progressBar = new loading()
const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    Router.events.on("routeChangeStart", progressBar.start);
    Router.events.on("routeChangeComplete", progressBar.finish);
    Router.events.on("routeChangeError", progressBar.finish);
    return () => {
      Router.events.off("routeChangeStart", progressBar.start);
      Router.events.off("routeChangeComplete", progressBar.finish);
      Router.events.off("routeChangeError", progressBar.finish);
    }
  }, [])
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
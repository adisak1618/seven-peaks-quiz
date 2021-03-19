import App from "next/app";
import React from "react";

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Component {...pageProps} />
    );
  }
}

export default MyApp;
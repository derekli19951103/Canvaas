import type { AppProps } from "next/app";
import "styles/globals.css";
require("antd/dist/antd.less");

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

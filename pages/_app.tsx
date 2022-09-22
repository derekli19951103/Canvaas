import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
require("antd/dist/antd.less");

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

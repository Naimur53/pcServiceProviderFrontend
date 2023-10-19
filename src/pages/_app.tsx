import { Provider } from "react-redux";
import { store } from "@/redux/app/store";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootLayout from "@/layout/RootLayout";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Easy PC</title>
      </Head>
      <Provider store={store}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </Provider>
      <ToastContainer></ToastContainer>
    </>
  );
}

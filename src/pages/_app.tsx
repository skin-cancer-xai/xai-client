import type { AppProps } from "next/app";

import Header from "@/components/Header";

import "@/styles/globals.css";
import "@/styles/button.css";
import "@/styles/header.css";
import "@/styles/main.css";
import "@/styles/model.css";
import "@/styles/diagnosisCard.css";
import "@/styles/resultList.css";
import "@/styles/result.css";
import "@/styles/test.css";
import "@/styles/modal.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

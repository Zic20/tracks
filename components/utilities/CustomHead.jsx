import React from "react";
import Head from "next/head";

const CustomHead = () => {
  return (
    <Head>
      <link rel="shortcut icon" href="/Logo.ico" type="image/x-icon" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
};

export default CustomHead;

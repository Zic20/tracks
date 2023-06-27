import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <div className="border-b">
        <div className="flex h-16 items-center px-4"></div>
      </div> */}
      <Component {...pageProps} />
    </>
  );
}

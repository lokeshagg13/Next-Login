import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { SessionProvider, useSession } from "next-auth/react";
import Loader from "../components/ui/loader";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        {/* <Component {...pageProps} /> */}
      </Layout>
    </SessionProvider>
  );
}

function Auth(props) {
  const { data: session, status } = useSession();
  if(status === "loading") {
    return <Loader />
  }
  return props.children;
}

export default MyApp;
